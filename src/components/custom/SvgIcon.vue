<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineOptions({ name: 'SvgIcon' });
/**
 * 图标组件
 * --支持iconify和本地svg图标
 * --同时传递了icon和localIcon，localIcon会优先渲染
 */
interface Props {
  /** 图标名称(图片的文件名) */
  icon: string;
  /** 前缀 */
  prefix?: string;
  /** 本地svg的文件名字 */
  localIcon?: string;

  color?: string;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || ''
}));

const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFFIX: preffix } = import.meta.env;
  const defaultLocalIcon = 'no-icon';
  const icon = props.localIcon || defaultLocalIcon;
  return `#${preffix}-${icon}`;
});
/** 渲染本地icon */
const renderLocalIcon = computed(() => props.localIcon || !props.icon);
</script>
<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor"></use>
    </svg>
  </template>
  <template v-else>
    <Icon :icon="icon" v-bind="bindAttrs" />
  </template>
</template>
<style lang="scss" scoped></style>
