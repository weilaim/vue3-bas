<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import { useRouteStore } from '@/store';
import { useBasicLayout } from '@/composables';
import SearchResult from './SearchResult.vue';
import SearchFooter from './SearchFooter.vue';

defineOptions({ name: 'SearchModal' });
interface Props {
  /** 弹窗显隐 */
  value: boolean;
}
interface Emit {
  (e: 'update:value', val: boolean): void;
}

const { isMobile } = useBasicLayout();
const router = useRouter();
const routeStore = useRouteStore();
const keyword = ref('');
const activePath = ref('');
const resultOptions = shallowRef<AuthRoute.Route[]>([]);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<Emit>();
const props = defineProps<Props>();

// 节流方法
const handleSearch = useDebounceFn(search, 300);

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit('update:value', val);
  }
});

/** 监听show */
watch(show, async val => {
  if (val) {
    /** 自动聚集 */
    await nextTick();
    inputRef.value?.focus();
  }
});

function search() {
  resultOptions.value = routeStore.searchMenus.filter(
    menu => keyword.value && menu.meta?.title.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim())
  );
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = '';
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === '') return;
  const routeItem = resultOptions.value.find(item => item.path === activePath.value);
  if (routeItem?.meta?.href) {
    window.open(activePath.value, '__blank');
  } else {
    router.push(activePath.value);
    handleClose();
  }
}

function handleClose() {
  show.value = false;
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = '';
  }, 200);
}
</script>
<template>
  <n-modal
    v-model:show="show"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    preset="card"
    footer-style="padding:0;margin:0"
    class="fixed left-0 right-0"
    :class="[isMobile ? 'wh-full top-0px rounded-0' : 'w-630px top-50px']"
    @after-leave="handleClose"
  >
    <n-input-group>
      <n-input ref="inputRef" v-model:value="keyword" clearable placeholder="请输入搜索关键词" @input="handleSearch">
        <template #prefix>
          <icon-uil-search class="text-15px text-[#c2c2c2]" />
        </template>
        <n-button v-if="isMobile" type="primary" ghost @click="handleClose">取消</n-button>
      </n-input>
    </n-input-group>
    <div class="mt-20px">
      <n-empty v-if="resultOptions.length === 0" description="暂无搜索结果"></n-empty>
      <search-result v-else v-model:value="activePath" :options="resultOptions" @enter="handleEnter" />
    </div>
    <template #footer>
      <search-footer v-if="!isMobile" />
    </template>
  </n-modal>
</template>
<style lang="scss" scoped></style>
