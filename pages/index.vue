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

import VChart, { THEME_KEY } from 'vue-echarts'
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

const { data, pending, error, refresh } = await useFetch('/api/database')

const source = data.value?.data.map((item) => {
  return {
    package: item.properties?.Name.title[0].plain_text,
    npm: item.properties['Npm Weekly Downloads'].number,
    mirror: item.properties['NpmMirror Weekly Downloads'].number,
  }
})

const option = ref({
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
})
</script>

<template>
  <div text-4xl>
    Public Database Charts
  </div>
  <div m1 text-lg fw300 op30>
    Visualization for Public Database
  </div>
  <div id="vue3">
    <a href="#vue3">
      Weekly Download Count for Vue3 Component Library
    </a>
  </div>
  <section mt-1 flex="~" justify-center>
    <figure b="soild op-10 rd-3" w-60vw border>
      <VChart class="chart" :option="option" m-auto h-180 w-60vw />
    </figure>
  </section>
</template>
