# Public Database Charts

[![Netlify Status](https://api.netlify.com/api/v1/badges/6cc584a0-55a8-4bab-8095-01225bea815c/deploy-status)](https://app.netlify.com/sites/public-database-charts/deploys)
![Nuxt](https://img.shields.io/badge/Nuxt-3.4-brightgreen)
![Typescript](https://img.shields.io/badge/TypeScript-4.9-brightgreen)
[![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true)](https://chat.imzbb.cc)

Visualization for Public Database.

## Note

- 由于某些依赖项不是 ESM 格式，编译时可能会出现找不到依赖的情况，因此需要进行转译。在 Nuxt 中需要在 `nuxt.config.ts` 配置 `build` 属性中的 [`transpile`](https://nuxt.com/docs/api/configuration/nuxt-config#transpile)。例如 ECharts 就需要转译。

```ts
build: {
    transpile: [/echarts/, /zrender/],
},
```
