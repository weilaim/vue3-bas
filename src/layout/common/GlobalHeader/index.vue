<script setup lang="ts">
import { useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import GlobalLogo from '../GlobalLogo/index.vue';
import { MenuCollapse, GlobalBreadcrumb, HeaderMenu } from './components';

defineOptions({ name: 'GlobalHeader' });
interface Prorps {
  showLogo: GlobalHeaderProps['showLogo'];
  showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
  showMenuCollapse: GlobalHeaderProps['showMenuCollapse'];
}
defineProps<Prorps>();

const theme = useThemeStore();
const { isMobile } = useBasicLayout();
</script>
<template>
  <dark-mode-container class="global-header flex-y-center h-full" :inverted="theme.header.inverted">
    <global-logo v-if="showLogo" :show-title="true" class="h-full" :style="{ width: theme.sider.width + 'px' }" />
    <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <!-- /** 侧边菜单收缩 */ -->
      <menu-collapse v-if="showMenuCollapse || isMobile" />
      <!-- /** 面包屑 */ -->
      <global-breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <header-menu v-else />
  </dark-mode-container>
</template>
<style lang="scss" scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
