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
import { provide } from 'vue'

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

const color = useColorMode()

provide(THEME_KEY, color)

async function getDatabaseData(tags: string[]) {
  const parames = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&')
  const { data: databaseData } = await useFetch(`/api/database?${parames}`)
  return databaseData
}

const init_charts = [
  {
    title: 'Test',
    tags: ['Test'],
  },
  {
    title: 'Framework',
    tags: ['Framework'],
  },
  {
    title: 'Vue3',
    tags: ['UI', 'Vue 3'],
  },
  {
    title: 'Vue2',
    tags: ['UI', 'Vue 2'],
  },
  {
    title: 'React',
    tags: ['UI', 'React'],
  },
]

const testData = await getDatabaseData(init_charts[0].tags)
const frameworkData = await getDatabaseData(init_charts[1].tags)
const vue3Data = await getDatabaseData(init_charts[2].tags)
const vue2Data = await getDatabaseData(init_charts[3].tags)
const reactData = await getDatabaseData(init_charts[4].tags)

function lastEditedTime(data: any) {
  const lastEditedTime = data.value.data[0].last_edited_time
  const date = new Date(lastEditedTime)
  return date.toLocaleString().replace(/:\d{1,2}$/, ' ')
}

const testLastEditedTime = lastEditedTime(testData)
const frameworkLastEditedTime = lastEditedTime(frameworkData)
const vue3LastEditedTime = lastEditedTime(vue3Data)
const vue2LastEditedTime = lastEditedTime(vue2Data)
const reactLastEditedTime = lastEditedTime(reactData)

const charts = [
  {
    title: 'Test',
    data: testData,
    lastEditedTime: testLastEditedTime,
  },
  {
    title: 'Framework',
    data: frameworkData,
    lastEditedTime: frameworkLastEditedTime,
  },
  {
    title: 'Vue3',
    data: vue3Data,
    lastEditedTime: vue3LastEditedTime,
  },
  {
    title: 'Vue2',
    data: vue2Data,
    lastEditedTime: vue2LastEditedTime,
  },
  {
    title: 'React',
    data: reactData,
    lastEditedTime: reactLastEditedTime,
  },
]
</script>

<template>
  <div text-4xl>
    Public Database Charts
  </div>
  <div m1 text-lg fw300 op30>
    Visualization for Public Database
  </div>
  Do you want to add a new component library to the chart or report an error? <a text-blue op40 href="https://github.com/zhengbangbo/public-database-charts/discussions/1" target="_blank">Please let me know.</a>
  <ChartsContainer v-for="chart in charts" :key="chart.title" :data="chart.data">
    <template #title>
      <div id="vue3" m-4 text-2xl>
        <span from-rose-400 to-indigo-500 via-fuchsia-500 bg-gradient-to-r bg-clip-text text-transparent>{{ chart.title }}</span> weekly downloads
      </div>
    </template>
    <template #last-edited-time>
      <div m-4 text-sm fw300 op30>
        Last Updated: {{ chart.lastEditedTime }}
      </div>
    </template>
  </ChartsContainer>
</template>
