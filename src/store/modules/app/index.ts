import { nextTick } from 'vue';
import { defineStore } from 'pinia';

interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    reloadFlag: true
  }),
  actions: {
    /**
     * 重载页面
     */
    async reloadPage() {
      window.$loadingBar?.start();
      this.reloadFlag = false;
      await nextTick();
      this.reloadFlag = true;

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        window.$loadingBar?.finish();
      }, 100);
    }
  }
});
