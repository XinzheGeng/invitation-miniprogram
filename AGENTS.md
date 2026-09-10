# AGENTS.md

## 项目构建与微信开发者工具刷新规范

本项目是 Taro 微信小程序。业务源码位于 `src/`，微信开发者工具实际读取 `dist/`。`project.config.json` 中的 `miniprogramRoot` 必须保持为 `dist/`。

### 修改代码后的标准流程

1. 只修改 `src/`、`config/` 和测试等源文件，不要手工修改 `dist/` 内的生成产物。
2. 修改后先执行静态检查：

   ```powershell
   npm run typecheck
   npm run lint
   ```

3. 选择一种 Taro 构建方式：

   - 持续开发：运行 `npm run dev:weapp`，保持该命令运行，由它把 `src/` 的变更持续写入 `dist/`。
   - 单次构建：每次修改后运行 `npm run build:weapp`。

   仅在微信开发者工具中点击“编译”，不会把 Taro 的 `.tsx`/`.scss` 源码构建到 `dist/`。

4. Taro 构建成功后，核验本次修改的页面产物。每个页面通常应有对应的 `.js`、`.json`、`.wxml` 和 `.wxss`。例如：

   ```powershell
   Get-ChildItem dist\pages\cover,dist\pages\home
   Get-ChildItem dist\packages\day\pages\index,dist\packages\weekend\pages\index
   ```

   同时用 `rg` 检查关键新文案是否已进入产物：

   ```powershell
   rg -n "待核验的新文案" dist
   ```

5. 在微信开发者工具中导入项目根目录，确认小程序目录是 `dist/`，然后点击“编译”。
6. 编译后逐页核对文案、样式、交互和图片，不要只验证当前打开的页面。

### 页面样式规则

- 全局样式由 `src/app.tsx` 显式导入 `src/app.scss`。
- 如果页面有同名样式文件，页面脚本必须显式导入，例如在 `index.tsx` 中写 `import './index.scss';`。Taro 不会在本项目配置下自动导入同名 SCSS。
- 新增或改动页面后，必须确认对应的 `dist/.../index.wxss` 已生成。若微信开发者工具报 `ENOENT ... index.wxss`，先检查页面 SCSS 是否被显式导入，不要直接在 `dist/` 中手工创建空文件。

### 缓存和部分更新排查

如果出现“部分样式已更新，但新文案为空或未更新”，通常是开发者工具混用了新页面分包和旧 `common.js`。按以下顺序处理：

1. 停止旧的 `dev:weapp` 进程，重新运行 `npm run build:weapp` 或重启 `npm run dev:weapp`。
2. 检查 `dist/common.js` 和相应页面 `.js` 中是否包含最新内容。
3. 在微信开发者工具中执行“工具 → 清缓存 → 全部清除”，再重新编译。
4. 如果仍无变化，关闭并重新打开该项目，再确认导入路径和 `miniprogramRoot`。

### 交付前验证

正常情况下运行：

```powershell
npm run verify
```

如果验证失败，需明确区分代码错误与本机环境或既有素材问题。即使构建命令显示成功，也必须执行第 4 步的产物存在性和内容检查。
