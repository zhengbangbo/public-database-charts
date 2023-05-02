<script setup lang="ts">
import VChart from 'vue-echarts'

const { data } = defineProps<{ data: any }>()

const chartData = ref(data)

const option = ref(useOption(useSource(chartData)))
const option1 = ref(usePieOption(useNpmData(chartData), 'npm'))
const option2 = ref(usePieOption(useMirrorData(chartData), 'mirror'))
const type = ref('bar')
</script>

<template>
  <section mt-8 flex="~" justify-center>
    <figure b="soild op-10 rd-3" border shadow-xl lg:w-900px md:w-700px sm:w-full>
      <slot name="title" />
      <div mb-5>
        <button text-md inline-block rounded b-rd-r-0 bg-yellow-500 px-2 py-1 font-medium transition hover:scale-110 active:bg-yellow-300 hover:shadow-xl focus:outline-none focus:ring @click="type = 'bar'">
          Bar
        </button>
        <button text-md inline-block rounded b-rd-l-0 bg-green-500 px-2 py-1 font-medium transition hover:scale-110 active:bg-green-300 hover:shadow-xl focus:outline-none focus:ring @click="type = 'pie'">
          Pie
        </button>
      </div>
      <VChart v-if="type === 'bar'" class="chart" :option="option" autoresize m-auto h-160 w-full />
      <div v-else flex="~ col" sm="flex-row" h-160 w-full>
        <VChart class="chart" :option="option1" autoresize m-auto />
        <VChart class="chart" :option="option2" autoresize m-auto />
      </div>
      <slot name="last-edited-time" />
    </figure>
  </section>
</template>
