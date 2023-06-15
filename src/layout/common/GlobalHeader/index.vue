<script setup lang="ts">
import { useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { GlobalSearch, GlobalLogo } from '..';
import {
  MenuCollapse,
  GlobalBreadcrumb,
  HeaderMenu,
  GithubSite,
  FullScreen,
  ThemeMode,
  SystemMessage,
  SettingButton,
  UserAvatar
} from './components';

defineOptions({ name: 'GlobalHeader' });
interface Prorps {
  showLogo: GlobalHeaderProps['showLogo'];
  showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
  showMenuCollapse: GlobalHeaderProps['showMenuCollapse'];
}
defineProps<Prorps>();

const theme = useThemeStore();
const { isMobile } = useBasicLayout();
const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL !== 'Y';
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
    <div class="flex justify-end h-full">
      <!-- 搜索 -->
      <global-search />
      <!-- github -->
      <github-site />
      <!-- 全屏 -->
      <full-screen />
      <!-- 主题切换 -->
      <theme-mode />

      <system-message />
      <!-- 设置 -->
      <setting-button v-if="showButton" />
      <!-- 用户信息 -->
      <user-avatar />
    </div>
  </dark-mode-container>
</template>
<style lang="scss" scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
