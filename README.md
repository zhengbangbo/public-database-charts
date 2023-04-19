# Public Database Charts

Visualization for Public Database.

<pre align="center">
🧪 Working in Progress
</pre>

## Note

- 由于某些依赖项不是 ESM 格式，编译时可能会出现找不到依赖的情况，因此需要进行转译。在 Nuxt 中使用 ECharts 需要在 `nuxt.config.ts` 配置 `build` 属性中的 [`transpile`](https://nuxt.com/docs/api/configuration/nuxt-config#transpile)。例如 ECharts 就需要转译。

```ts
build: {
    transpile: [/echarts/, /zrender/],
},
```
