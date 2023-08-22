<script setup lang="ts">
import type { DataTableColumn } from 'naive-ui';
import VueDraggable from 'vuedraggable';

type Column = DataTableColumn<UserManagement.User>;

interface Props {
  columns: Column[];
}
interface Emits {
  (e: 'update:columns', columns: Column[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

type List = Column & { checked?: boolean };
const list = ref(initList());
function initList(): List[] {
  return props.columns.map(item => ({ ...item, checked: true }));
}

watch(
  list,
  newValue => {
    const newColumns = newValue.filter(item => item.checked);

    const columns: Column[] = newColumns.map(item => {
      const column = { ...item };
      delete column.checked;
      return column;
    }) as Column[];

    emit('update:columns', columns);
  },
  { deep: true }
);
</script>
<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button size="small" type="primary">
        <icon-ant-design-setting-outlined class="mr-4px text-16px"></icon-ant-design-setting-outlined>
        表格设置
      </n-button>
    </template>
    <div class="w-180px">
      <vue-draggable v-model="list" item-key="key">
        <template #item="{ element }">
          <div v-if="element.key" class="flex-y-center h-36px px-12px hover:bg-primary_active">
            <icon-mdi-drag class="mr-8px text-20px cursor-move"></icon-mdi-drag>
            <n-checkbox v-model:checked="element.checked">
              {{ element.title }}
            </n-checkbox>
          </div>
        </template>
      </vue-draggable>
    </div>
  </n-popover>
</template>
<style lang="scss" scoped></style>
