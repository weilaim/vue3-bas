import { defineStore } from 'pinia';
import { router } from '@/router';
import { setSession } from '@/utils';
import { activeTab, tabs, WITHOUT_TAB_PATHS } from './helpers';

export interface TabItem {
  name: string;
  path: string;
  title?: string;
}

export const useTabStore = defineStore('tab', {
  state() {
    return {
      tabs: <Array<TabItem>>tabs || [],
      activeTab: <string>activeTab || ''
    };
  },
  actions: {
    setActiveTab(path: string) {
      this.activeTab = path;
      setSession('activeeTab', path);
    },
    setTabs(tab: Array<TabItem>) {
      this.tabs = tab;
      setSession('tabs', tab);
    },
    addTab(tab: TabItem) {
      this.setActiveTab(tab.path);
      if (WITHOUT_TAB_PATHS.includes(tab.path) || this.tabs.some(item => item.path === tab.path)) return;
      this.setTabs([...this.tabs, tab]);
    },
    removeTabs(path: string) {
      if (path === this.activeTab) {
        const activeIndex = this.tabs.findIndex(item => item.path === path);
        if (activeIndex > 0) router.push(this.tabs[activeIndex - 1].path);
        else router.push(this.tabs[activeIndex + 1].path);
      }
      this.setTabs(this.tabs.filter(tab => tab.path !== path));
    },
    removeOther(curPath: string) {
      this.setTabs(this.tabs.filter(tab => tab.path === curPath));
      if (curPath !== this.activeTab) router.push(this.tabs[(this.tabs.length = 1)].path);
    },
    removeLeft(curPath: string) {
      const curIndex = this.tabs.findIndex(item => item.path === curPath);
      const filterTabs = this.tabs.filter((_item, index) => index >= curIndex);
      this.setTabs(filterTabs);
      if (!filterTabs.find(item => item.path === this.activeTab)) router.push(filterTabs[filterTabs.length - 1].path);
    },
    removeRight(curPaht: string) {
      const curIndex = this.tabs.findIndex(item => item.path === curPaht);
      const filterTabs = this.tabs.filter((_item, index) => index <= curIndex);
      this.setTabs(filterTabs);
      if (!filterTabs.find(item => item.path === this.activeTab)) router.push(filterTabs[filterTabs.length - 1].path);
    },
    resetTabs() {
      this.setTabs([]);
      this.setActiveTab('');
    }
  }
});
