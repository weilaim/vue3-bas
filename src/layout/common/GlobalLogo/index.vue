<script setup lang="ts">
import { routePath } from '@/router';
interface Prorps {
  showTitle: boolean;
}

defineProps<Prorps>();

defineOptions({ name: 'GlobalLogo' });
const routeHomePath = routePath('root');
</script>
<template>
  <router-link :to="routeHomePath">
    <system-logo class="text-32px text-primary" />
    <h2 v-show="showTitle" class="pl-18"></h2>
  </router-link>
</template>
<style lang="scss" scoped></style>
