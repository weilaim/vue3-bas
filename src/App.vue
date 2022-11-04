<script setup lang="ts"></script>

<template>
  <div bg-red>a</div>
  <app-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </app-provider>
</template>

<style scoped></style>
