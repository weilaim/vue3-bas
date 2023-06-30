<script setup lang="ts">
import { BottomPart, DataCard, TopChart } from './components';
</script>
<template>
  <n-space :vertical="true" :size="16">
    <top-chart />
    <data-card />
    <bottom-part />
  </n-space>
</template>
<style lang="scss" scoped></style>
