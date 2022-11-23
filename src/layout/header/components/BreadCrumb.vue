<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { Meta } from '~/src/typings/router';
import { renderIcon, renderLocalIcon } from '~/src/utils';

const router = useRouter();
const route = useRoute();
const handleBreadClick = (path: string) => {
  if (path === route.path) return;
  router.push(path);
};

const getIcon = (meta?: Meta, size = 16) => {
  if (meta?.customIcon) return renderLocalIcon(meta.customIcon, { size });
  if (meta?.icon) return renderIcon(meta.icon, { size });
  return null;
};
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item in route.matched.filter(fitem => !!fitem.meta?.title)"
      :key="item.path"
      @click="handleBreadClick(item.path)"
    >
      <component :is="getIcon(item.meta)" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
<style lang="scss" scoped></style>
