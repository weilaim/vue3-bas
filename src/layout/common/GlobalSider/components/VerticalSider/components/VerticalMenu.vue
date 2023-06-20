<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { useAppStore, useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';

const { routerPush } = useRouterPush();

defineOptions({ name: 'VerticalMenu' });
const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const menus = computed(() => routeStore.menus as GlobalMenuOption[]);

const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(key: string[]) {
  expandedKeys.value = key;
}
</script>
<template>
  <n-scrollbar class="flex-1-hidden">
    <n-menu
      class="side-menu"
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menus"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="theme.sider.inverted"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>
<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
