<script setup lang="ts">
import { routePath } from '@/router';

const bastTitle = import.meta.env.VITE_APP_TITLE || 'WEILAIM';
interface Prorps {
  showTitle: boolean;
}

defineProps<Prorps>();

defineOptions({ name: 'GlobalLogo' });
const routeHomePath = routePath('root');
</script>
<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <system-logo class="text-32px text-primary" />
    <h2 v-show="showTitle" class="pl-10px text-16px font-bold text-primary transition duration-300 ease-in-out">
      {{ bastTitle }}
    </h2>
  </router-link>
</template>
<style lang="scss" scoped></style>
