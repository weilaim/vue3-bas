<script setup lang="ts">
const handleLinkClick = () => {
  window.open('https://github.com/weilaim');
};
</script>
<template>
  <n-icon mr-20 size="18" style="cursor: pointer" @click="handleLinkClick">
    <icon-mdi:github />
  </n-icon>
</template>
<style lang="scss" scoped></style>
