<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { TabItem } from '@/store';
import { useThemeStore, useTabStore } from '@/store';
import ScrollX from '@/components/common/ScrollX.vue';
const useTheme = useThemeStore();
const tabStore = useTabStore();
const router = useRouter();
const route = useRoute();

interface ContextMenuOption {
  show: boolean;
  x: number;
  y: number;
  currentPath: string;
}
const contentMenuOption = reactive<ContextMenuOption>({
  show: false,
  x: 0,
  y: 0,
  currentPath: ''
});

watch(
  () => route.path,
  () => {
    const { name, path } = route;
    const title = (route.meta?.title as string) || '';
    tabStore.addTab({ name: name as string, path, title });
  },
  { immediate: true }
);
const showContextMenu = () => {
  contentMenuOption.show = true;
};
const hideContextMenu = () => {
  contentMenuOption.show = false;
};
const setContextMenu = (x: number, y: number, currentPath: string) => {
  Object.assign(contentMenuOption, { x, y, currentPath });
};

const handleContextMenu = async (e: MouseEvent, tabItem: TabItem) => {
  const { clientX, clientY } = e;
  hideContextMenu();
  setContextMenu(clientX, clientY, tabItem.path);
  await nextTick();
  showContextMenu();
};

const handleTagClick = (path: string) => {
  tabStore.setActiveTab(path);
  router.push(path);
};
</script>
<template>
  <ScrollX bg-whire dark:bg-dark :style="{ height: `${useTheme.tab.height}px` }">
    <n-tag
      v-for="tab in tabStore.tabs"
      :key="tab.path"
      px-15
      mx-5
      rounded-4
      cursor-pointer
      :type="tabStore.activeTab === tab.path ? 'primary' : 'default'"
      :closable="tabStore.tabs.length > 1"
      @click="handleTagClick(tab.path)"
      @close.stop="tabStore.removeTabs(tab.path)"
      @contextmenu.prevent="handleContextMenu($event, tab)"
      >{{ tab.title }}</n-tag
    >
  </ScrollX>
</template>
<style lang="scss" scoped></style>
