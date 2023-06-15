<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({ name: 'SearchResult' });
interface Props {
  value: string;
  options: AuthRoute.Route[];
}
interface Emits {
  (e: 'update:value', val: string): void;
  (e: 'enter'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const theme = useThemeStore();
const active = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit('update:value', val);
  }
});
</script>
<template>
  <n-scrollbar>
    <div class="pb-12px">
      <template v-for="item in options" :key="item.path">
        <div
          class="bg-[#e5e7eb] dark:bg-dark h-56px mt-8px px-14px rounded-4px cursor-pointerr flex-y-center justify-between"
          :style="{
            background: item.path === active ? theme.themeColor : '',
            color: item.path === active ? '#fff' : ''
          }"
        ></div>
      </template>
    </div>
  </n-scrollbar>
</template>
<style lang="scss" scoped></style>
