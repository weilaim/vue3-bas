<!-- eslint-disable no-unused-expressions -->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { useAppStore, usePermissionStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
import { isUrl, getMenuItem, getToken } from '@/utils';
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const themeStore = useThemeStore();
const router = useRouter();
const { currentRoute } = router;
const { routerPush } = useRouterPush();

const menuOptions = computed(() => {
  return permissionStore.menus.map(item => getMenuItem(item)).sort((a, b) => a.order - b.order) as GlobalMenuOpiton[];
});

/**
 * 选择点击的菜单
 * @param _key key
 * @param item 返回item
 */
const handleMenuHandle = (_key: string, item: MenuOption) => {
  const menuItem = item as GlobalMenuOpiton;
  if (isUrl(menuItem.path)) {
    // window.open(menuItem.path);
    routerPush(menuItem.path);
    return;
  }
  if (menuItem.path === currentRoute.value.path && !currentRoute.value.meta?.keepAlive) {
    appStore.reloadPage();
  } else {
    const token = getToken();
    const isLogin = Boolean(token);
    // 切换的时候，如果没有了token就直接跳转到login
    if (!isLogin) {
      router.push('/login?redirect=/workbench');
    } else {
      router.push(menuItem.path);

      // 手机端自动收起菜单
      themeStore.isMobile && themeStore.setCollapsed(true);
    }
  }
};
</script>
<template>
  <n-menu
    class="side-menu"
    :indent="18"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :value="(currentRoute.meta && currentRoute.meta.activeMenu as string) || (currentRoute.name as string)"
    @update:value="handleMenuHandle"
  />
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
