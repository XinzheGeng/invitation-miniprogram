# 一线良辰 · Taro 微信小程序

从 Web 婚礼请柬迁移的独立 Taro 4 + React 18 + TypeScript 项目。首版完全使用包内静态数据和素材，不依赖自建服务器或业务域名。

## 开发

要求 Node 22.13–24、npm 10+。执行：

```sh
npm ci
npm run dev:weapp
```

微信开发者工具导入项目根目录。`project.config.json` 当前使用游客 AppID；获得正式 AppID 后只替换 `appid`，不要把 AppSecret 写入源码。

## 验证

```sh
npm run verify
```

内容集中在 `src/data` 和各分包 `data.ts`；章节独有照片位于分包 assets。发布前按 `docs/release-checklist.md` 完成素材、真机、备案与审核检查。

本项目不会自动上传、提审或发布微信版本。源 Web 项目保持独立。
