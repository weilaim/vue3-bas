<script setup lang="ts">
import type { Options } from '@better-scroll/core';
import BScroll from '@better-scroll/core';
import { useElementSize } from '@vueuse/core';

defineOptions({ name: 'BetterScroll' });

const bsWrap = ref<HTMLElement>();

interface Props {
  /** better-scroll的配置: https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html */
  options: Options;
}
const props = defineProps<Props>();
const isScrollY = computed(() => Boolean(props.options.scrollY));
const instance = ref<BScroll>();
const bsContent = ref<HTMLElement>();

// 滚动元素发生变化，刷新BS
const { width: wrapWidth } = useElementSize(bsWrap);
const { width, height } = useElementSize(bsContent);

watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
  if (instance.value) {
    instance.value.refresh();
  }
});

function initBetterScroll() {
  if (!bsWrap.value) return;
  instance.value = new BScroll(bsWrap.value, props.options);
}

onMounted(() => {
  initBetterScroll();
});

defineExpose({ instance });
</script>
<template>
  <div ref="bsWrap" class="h-full text-left">
    <div ref="bsContent" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
