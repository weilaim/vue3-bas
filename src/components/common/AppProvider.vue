<!-- eslint-disable guard-for-in -->
<script setup lang="ts">
import { watch } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import {
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider
} from 'naive-ui';
import { kebabCase } from 'lodash';
import { useCssVar } from '@vueuse/core';
import { useThemeStore } from '@/store';

function setupNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$message = useMessage();
  window.$dialog = useDialog();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools();
  },
  render() {
    return h('div');
  }
});

const themeStore = useThemeStore();
type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>;
type ThemeVarsKeys = keyof ThemeVars;
watch(
  () => themeStore.naiveThemeOverrides.common,
  common => {
    for (const key in common) {
      useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key as ThemeVarsKeys] || '';
      if (key === 'primaryColor') window.localStorage.setItem('__THEME_COLOR__', common[key as ThemeVarsKeys] || '');
    }
  },
  { immediate: true }
);

watch(
  () => themeStore.darkMode,
  newValue => {
    if (newValue) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  },
  {
    immediate: true
  }
);

function handleWindowResize() {
  themeStore.setIsMobile(document.body.offsetWidth <= 640);
}

onMounted(() => {
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize);
});
</script>
<template>
  <n-config-provider wh-full :theme-overrides="themeStore.naiveThemeOverrides" :theme="themeStore.naiveTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot />
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<style lang="scss" scoped></style>
