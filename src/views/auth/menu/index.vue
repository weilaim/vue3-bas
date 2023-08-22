<script setup lang="ts">
import { useAuthStore } from '@/store';

const auth = useAuthStore();
console.log('auth', auth.userInfo);
</script>
<template>
  <div class="h-full">
    <n-card title="权限切换" class="h-full shadow-sm rounded-16px">
      <div class="pb-12px">
        <n-gradient-text type="primary" :size="20">当前用户权限:{{ auth.userInfo.userRole }}</n-gradient-text>
      </div>
    </n-card>
  </div>
</template>
<style lang="scss" scoped></style>
