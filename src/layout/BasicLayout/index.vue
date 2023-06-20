<script setup lang="ts">
import AdminLayout from '@soybeanjs/vue-admin-layout';
import { useAppStore, useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
import {
  GlobalHeader,
  GlobalContent,
  GlobalSider,
  GlobalTab,
  GlobalFooter,
  GlobalBackTop,
  SettingDrawer
} from '../common';
defineOptions({ name: 'BasicLayout' });
const app = useAppStore();
const theme = useThemeStore();
const { mode, isMobile, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();
const { bool: addMainOverflowHidden, setBool: setAddMainOverflowHidden } = useBoolean();
</script>
<template>
  <admin-layout
    :model="mode"
    :is-mobile="isMobile"
    :fixed-header-ant-tab="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :sider-visible="siderVisible"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :sider-collapse="app.siderCollapse"
    :app-main-overflow-hidden="addMainOverflowHidden"
    :fixed-footer="theme.footer.fixed"
    @update:sider-collapse="app.setSiderCollapse"
  >
    <template #header>
      <global-header v-bind="headerProps" />
    </template>
    <template #tab>
      <global-tab />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <global-content @hide-main-overflow="setAddMainOverflowHidden" />
    <template #footer>
      <global-footer />
    </template>
  </admin-layout>
  <!-- 回到顶部 -->
  <global-back-top />
  <!-- 设置按钮 -->
  <setting-drawer />
</template>
<style lang="scss" scoped></style>
