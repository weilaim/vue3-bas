<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>
<template>
  <div class="flex-y-center justify-between">
    <span>{{ label }}</span>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>
