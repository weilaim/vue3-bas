<script setup lang="ts">
import { useAuthStore } from '~/src/store';
import { renderIcon } from '~/src/utils';
const userStore = useAuthStore();
const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: 14 })
  }
];

const handleSelect = (key: string) => {
  if (key === 'logout') {
    window.$dialog?.info({
      content: '确认退出',
      title: '提示',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick() {
        userStore.logout();
        window.$message?.success('已退出登录!');
      }
    });
  }
};
</script>
<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <img :src="userStore.avatar" mr-10 w-35 h-35 rounded-full />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>
<style lang="scss" scoped></style>
