<script setup lang="ts"></script>

<template>
  <app-provider class="h-full">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </app-provider>
</template>
<style scoped></style>
