# 迁移基线

- 源项目：`D:/gengxz/projects/invitation`
- 源分支：`codex/vercel-migration`
- 源提交：`7ec7f4dace80ad41bf4b0000d61c81189a164108`
- 迁移日期：2026-09-07
- 目标：Taro 4.2.1、React 18.3.1、TypeScript 5.9.3、Webpack 5.91.0，仅微信小程序。
- Node 验证版本：24.14.0；项目声明支持 Node 22.13 至 24。
- AppID 当前为 `touristappid`，只用于本地开发导入，正式体验与真机分享需替换。

现阶段使用源项目的 17 张占位图，经 JPEG 压缩后进入主包或对应普通分包。头像及大尺寸图标放在 `release-assets`，不进入运行包。
