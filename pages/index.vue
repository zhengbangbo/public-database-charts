<script setup lang="ts">
import { use } from 'echarts/core'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import { THEME_KEY } from 'vue-echarts'
import { provide, ref } from 'vue'

use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
])

provide(THEME_KEY, 'light')

const { data: vue3Data } = await useFetch('/api/database?q=vue3')
const { data: vue2Data } = await useFetch('/api/database?q=vue2')
const { data: reactData } = await useFetch('/api/database?q=react')

function useSource(data: any) {
  return data.value.data.map((item: any) => {
    return {
      package: item.properties?.Name.title[0].plain_text,
      npm: item.properties['Npm Weekly Downloads'].number,
      mirror: item.properties['NpmMirror Weekly Downloads'].number,
    }
  },
  )
}

const vue3Source = useSource(vue3Data)
const vue2Source = useSource(vue2Data)
const reactSource = useSource(reactData)

function useOption(source: any) {
  return ref({
    legend: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataset: {
      dimensions: ['package', 'npm', 'mirror'],
      source,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 20,
        align: 'center',
        margin: 20,
        hideOverlap: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
      },
      {
        type: 'bar',
      },
    ],
    grid: {
      left: '70px',
      right: '70px',
    },
  })
}

const vue3Option = useOption(vue3Source)
const vue2Option = useOption(vue2Source)
const reactOption = useOption(reactSource)
</script>

<template>
  <div text-4xl>
    Public Database Charts
  </div>
  <div m1 text-lg fw300 op30>
    Visualization for Public Database
  </div>
  <MyChart :option="vue3Option">
    <template #title>
      <div id="vue3" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>Vue3</span> Component Library
      </div>
    </template>
  </MyChart>
  <MyChart :option="vue2Option">
    <template #title>
      <div id="vue2" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>Vue2</span> Component Library
      </div>
    </template>
  </MyChart>
  <MyChart :option="reactOption">
    <template #title>
      <div id="react" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>React</span> Component Library
      </div>
    </template>
  </MyChart>
</template>
