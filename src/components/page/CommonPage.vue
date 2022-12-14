<script setup lang="ts">
interface Props {
  showFooter?: boolean;
  showHeader?: boolean;
  title?: string;
}
withDefaults(defineProps<Props>(), {
  showFooter: false,
  showHeader: true,
  title: undefined
});
</script>
<template>
  <AppPage :show-footer="showFooter">
    <n-card rounded-10 flex-1>
      <slot />
    </n-card>
  </AppPage>
</template>
<style lang="scss" scoped></style>
