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
      <div mb-5 >
        <button inline-block rounded b-rd-r-0 bg-yellow-500 px-2 py-1  text-md font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-yellow-300 @click="type = 'bar'">
          Bar
        </button>
        <button inline-block rounded b-rd-l-0 bg-green-500 px-2 py-1 text-md font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-green-300 @click="type = 'pie'">
          Pie
        </button>
      </div>
      <VChart v-show="type === 'bar'" class="chart" :option="option" autoresize m-auto h-160 w-full />
      <div v-show="type === 'pie'" flex="~">
        <VChart class="chart" :option="option1" autoresize m-auto h-160 w-50% />
        <VChart class="chart" :option="option2" autoresize m-auto h-160 w-50% />
      </div>
      <slot name="last-edited-time" />
    </figure>
  </section>
</template>
