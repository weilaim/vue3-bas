<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /**  颜色 */
  color: string;
  checked: boolean;
  iconClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  iconClass: 'text-14px'
});

const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)'];
const isWhite = computed(() => whiteColors.includes(props.color));
</script>
<template>
  <div class="flex-center w-20px h-20px rounded-2px shadow cursor-pointer" :style="{ backgroundColor: color }">
    <icon-ic-outline-check
      v-if="checked"
      :class="[iconClass, isWhite ? 'text-gray-700' : 'text-white']"
    ></icon-ic-outline-check>
  </div>
</template>
<style lang="scss" scoped></style>
