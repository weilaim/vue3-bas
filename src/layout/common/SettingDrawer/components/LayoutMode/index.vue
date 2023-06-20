<script setup lang="ts">
import { useThemeStore } from '@/store';
import { LayoutCheckBox } from './components';
const theme = useThemeStore();
</script>
<template>
  <n-divider title-placement="center">布局模式</n-divider>
  <n-space justify="space-between">
    <layout-check-box
      v-for="item in theme.layout.modeList"
      :key="item.value"
      :mode="item.value"
      :label="item.label"
      :checked="item.value === theme.layout.mode"
      @click="theme.setLayoutMode(item.value)"
    />
  </n-space>
</template>
<style lang="scss" scoped></style>
