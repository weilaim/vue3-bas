<script setup lang="ts">
import { useAppStore } from '@/store';
import { useLoading } from '@/hooks';

const app = useAppStore();
const { loading, startLoading, endLoading } = useLoading();

function handleRefresh() {
  startLoading();
  app.reloadPage();
  setTimeout(() => {
    endLoading();
  }, 1000);
}
</script>
<template>
  <hover-container class="2-64px h-full" tooltip-content="重新加载" placement="bottom-end" @click="handleRefresh">
    <icon-mdi-refresh class="textx-22px" :class="{ 'animate-spin': loading }" />
  </hover-container>
</template>
<style lang="scss" scoped></style>
