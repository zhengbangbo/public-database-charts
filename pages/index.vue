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
    source: [
      { package: 'Element Plus', npm: 167436, mirror: 73544 },
      { package: 'Vant', npm: 66964, mirror: 52394 },
      { package: '@headlessui/vue', npm: 113172, mirror: 991 },
      { package: 'quasar', npm: 111112, mirror: 2001 },
      { package: 'primevue', npm: 81236, mirror: 449 },
      { package: 'Naive UI', npm: 52297, mirror: 6939 },
      { package: 'Vuestic UI', npm: 3715, mirror: 90 },
      { package: 'View UI Plus', npm: 2520, mirror: 964 },
      { package: 'Nut UI', npm: 2258, mirror: 1092 },
      { package: 'TDesign Vue Next', npm: 1702, mirror: 1244 },
      { package: 'Fighting Design', npm: 522, mirror: 34 },
    ],
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
    <figure border b="soild op-10 rd-3" w-60vw >
      <VChart class="chart" :option="option" w-60vw m-auto h-180 />
    </figure>
  </section>
</template>
