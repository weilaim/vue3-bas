<script setup lang="ts">
import bgImg from '@/assets/images/login_bg.webp';
</script>
<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div h-300 w-full bg-black>aa</div>
    <div h-300 w-full>aa</div>
  </AppPage>
  <div bg-green h-400 w-full>a</div>
</template>
<style lang="scss" scoped></style>
