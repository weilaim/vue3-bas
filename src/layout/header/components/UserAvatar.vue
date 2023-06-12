<script setup lang="ts">
import { useAuthStore } from '@/store';
import { renderIcon } from '@/utils';
const userAuthStore = useAuthStore();
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
        userAuthStore.resetAuthStore();
        window.$message?.success('已退出登录!');
      }
    });
  }
};
</script>
<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <img :src="userAuthStore.avatar" mr-10 w-35 h-35 rounded-full />
      <span>{{ userAuthStore.name }}</span>
    </div>
  </n-dropdown>
</template>
<style lang="scss" scoped></style>
