<script setup lang="ts">
import { use } from 'echarts/core'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { BarChart, PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { THEME_KEY } from 'vue-echarts'
import { provide, ref } from 'vue'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
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

function lastEditedTime(data: any) {
  const lastEditedTime = data.value.data[0].last_edited_time
  const date = new Date(lastEditedTime)
  return date.toLocaleString().replace(/:\d{1,2}$/, ' ')
}

const vue3LastEditedTime = lastEditedTime(vue3Data)
const vue2LastEditedTime = lastEditedTime(vue2Data)
const reactLastEditedTime = lastEditedTime(reactData)

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

function useNpmData(data: any) {
  return data.value.data.map((item: any) => {
    return {
      value: item.properties['Npm Weekly Downloads'].number,
      name: item.properties?.Name.title[0].plain_text,
    }
  }).sort((a: any, b: any) => b.value - a.value)
}

function useMirrorData(data: any) {
  return data.value.data.map((item: any) => {
    return {
      value: item.properties['NpmMirror Weekly Downloads'].number,
      name: item.properties?.Name.title[0].plain_text,
    }
  }).sort((a: any, b: any) => b.value - a.value)
}

const vue3BarSource = useSource(vue3Data)
const vue3PieNpmData = useNpmData(vue3Data)
const vue3PieMirrorData = useMirrorData(vue3Data)
const vue2BarSource = useSource(vue2Data)
const reactBarSource = useSource(reactData)

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
        rotate: 10,
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

function usePieOption(data: any, title: string) {
  return ref({
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        label: {
          formatter: '{b}\n{d}%',
          position: 'inside',
          fontFamily: 'sans-serif',
        },
        type: 'pie',
        radius: '75%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })
}

const vue3BarOption = useOption(vue3BarSource)
const vue3PieNpmOption = usePieOption(vue3PieNpmData, 'Npm')
const vue3PieMirrorOption = usePieOption(vue3PieMirrorData, 'NpmMirror')
const vue2BarOption = useOption(vue2BarSource)
const reactBarOption = useOption(reactBarSource)
</script>

<template>
  <div text-4xl>
    Public Database Charts
  </div>
  <div m1 text-lg fw300 op30>
    Visualization for Public Database
  </div>
  Do you want to add a new component library to the chart or report an error? <a text-blue op40 href="https://github.com/zhengbangbo/public-database-charts/discussions/1" target="_blank">Please let me know.</a>
  <MyPieChart :option1="vue3PieNpmOption" :option2="vue3PieMirrorOption">
    <template #title>
      <div id="vue3" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>Vue3</span> Component Library
      </div>
    </template>
    <template #last-edited-time>
      <div m-4 text-sm fw300 op30>
        Last Updated: {{ vue3LastEditedTime }}
      </div>
    </template>
  </MyPieChart>
  <MyBarChart :option="vue3BarOption">
    <template #title>
      <div id="vue3" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>Vue3</span> Component Library
      </div>
    </template>
    <template #last-edited-time>
      <div m-4 text-sm fw300 op30>
        Last Updated: {{ vue3LastEditedTime }}
      </div>
    </template>
  </MyBarChart>
  <MyBarChart :option="vue2BarOption">
    <template #title>
      <div id="vue2" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>Vue2</span> Component Library
      </div>
    </template>
    <template #last-edited-time>
      <div m-4 text-sm fw300 op30>
        Last Updated: {{ vue2LastEditedTime }}
      </div>
    </template>
  </MyBarChart>
  <MyBarChart :option="reactBarOption">
    <template #title>
      <div id="react" m-4 text-2xl>
        Weekly Download Count for <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>React</span> Component Library
      </div>
    </template>
    <template #last-edited-time>
      <div m-4 text-sm fw300 op30>
        Last Updated: {{ reactLastEditedTime }}
      </div>
    </template>
  </MyBarChart>
</template>
