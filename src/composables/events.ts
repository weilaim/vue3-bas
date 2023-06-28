/** 全局事件 */

import { useEventListener } from '@vueuse/core';
import { useTabStore, useThemeStore } from '@/store';

export function useGlobalEvents() {
  const theme = useThemeStore();
  const tab = useTabStore();
  /** 离开时缓存多页签数据 */
  useEventListener(window, 'beforeunload', () => {
    theme.cacheThemeSettings();
    tab.cacheTabRoutes();
  });
}
