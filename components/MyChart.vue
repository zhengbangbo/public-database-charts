<script setup lang="ts">
import VChart from 'vue-echarts'

const { option } = defineProps<{ option: any }>()
</script>

<template>
  <section mt-8 flex="~" justify-center>
    <figure b="soild op-10 rd-3" border shadow-xl lg:w-900px md:w-700px sm:w-full>
      <slot name="title" />
      <VChart class="chart" :option="option" autoresize m-auto h-160 w-full />
      <slot name="last-edited-time" />
    </figure>
  </section>
</template>
