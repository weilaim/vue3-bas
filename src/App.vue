<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui';
import { useThemeStore, subscribeStore } from '@/store';
import { useGlobalEvents } from '@/composables';
const theme = useThemeStore();
subscribeStore();
useGlobalEvents();
</script>

<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>
<style scoped></style>
