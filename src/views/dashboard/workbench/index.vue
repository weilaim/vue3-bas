<script setup lang="ts">
import { WorkbenchHeader, WorkbenchMain } from './components';
</script>
<template>
  <n-space :vertical="true" :size="16">
    <workbench-header></workbench-header>
    <workbench-main></workbench-main>
  </n-space>
</template>
<style lang="scss" scoped></style>
