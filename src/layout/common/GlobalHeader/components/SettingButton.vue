<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store';

defineOptions({ name: 'SettingButton' });
const theme = useThemeStore();
const app = useAppStore();
</script>
<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="主题配置"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible"
  >
    <icon-ant-design-setting-outlined class="text-20px" />
  </hover-container>
</template>
<style lang="scss" scoped></style>
