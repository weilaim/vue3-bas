<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://v3.cn.vuejs.org/');
</script>
<template>
  <div class="h-full">
    <iframe class="wh-full" :src="src"></iframe>
  </div>
</template>
<style lang="scss" scoped></style>
