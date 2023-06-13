import { nextTick } from 'vue';
import { defineStore } from 'pinia';

interface AppState {
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 项目配置的抽屉可见状态 */
  settingDrawerVisible: boolean;
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** vertical-mix模式下 侧边栏的固定状态 */
  mixSiderFixed: boolean;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    reloadFlag: true,
    settingDrawerVisible: false,
    siderCollapse: false,
    mixSiderFixed: false
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
    },
    /**
     * 设置侧边栏折叠状态
     */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /**
     * 折叠/展开 侧边栏折叠状态
     */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    }
  }
});
