<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store';
import { GlobalLogo } from '@/layout/common';
import { VerticalMenu } from './components';

defineOptions({ name: 'VerticalSider' });
const app = useAppStore();
const theme = useThemeStore();
const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');
</script>
<template>
  <dark-mode-container class="flex-col-stretch h-full" :inverted="theme.sider.inverted">
    <global-logo v-if="!isHorizontalMix" :show-title="showTitle" :style="{ height: theme.header.height + 'px' }" />
    <vertical-menu />
  </dark-mode-container>
</template>
<style lang="scss" scoped></style>
