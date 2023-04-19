<script setup lang="ts">
import VChart from 'vue-echarts'

const { option } = defineProps<{ option: any }>()
</script>

<template>
  <section mt-8 flex="~" justify-center>
    <figure b="soild op-10 rd-3" w-60vw border shadow-xl>
      <slot name="title" />
      <VChart class="chart" :option="option" m-auto h-180 w-full />
    </figure>
  </section>
</template>
