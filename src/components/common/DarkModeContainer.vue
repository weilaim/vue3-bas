<script setup lang="ts">
defineOptions({ name: 'DarkModeContainer' });
interface Props {
  inverted?: boolean;
}

withDefaults(defineProps<Props>(), {
  inverted: false
});
</script>
<template>
  <div
    class="dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
    :class="inverted ? 'bg-[#001428] text-whire' : 'bg-white text-[#333639]'"
  >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>
