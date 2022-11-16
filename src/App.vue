<script setup lang="ts"></script>

<template>
  <app-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </app-provider>
</template>

<style scoped></style>
