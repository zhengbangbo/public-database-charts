<script setup lang="ts">
import VChart from 'vue-echarts'

const { option1, option2 } = defineProps<{ option1: any; option2: any }>()
</script>

<template>
  <section mt-8 flex="~" justify-center>
    <figure b="soild op-10 rd-3" border shadow-xl lg:w-900px md:w-700px sm:w-full>
      <slot name="title" />
      <div flex="~">
        <VChart class="chart" :option="option1" autoresize m-auto h-160 w-50% />
        <VChart class="chart" :option="option2" autoresize m-auto h-160 w-50% />
      </div>
      <slot name="last-edited-time" />
    </figure>
  </section>
</template>
