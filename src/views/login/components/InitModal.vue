<template>
  <n-modal v-model:show="modalVisible">
    <n-spin :show="loading">
      <n-card
        style="width: 700px; height: 700px"
        title="数据库初始化"
        size="huge"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="formRef" :label-width="700" :model="formValue" :rules="rules" :size="size">
          <n-form-item label="数据库类型" path="db.type">
            <n-select v-model:value="formValue.db.type" default-value="mysql" :options="options" />
          </n-form-item>

          <n-form-item label="host" path="db.host">
            <n-input v-model:value="formValue.db.host" placeholder="127.0.0.1" />
          </n-form-item>
          <n-form-item label="port" path="db.port">
            <n-input v-model:value="formValue.db.port" placeholder="3306" />
          </n-form-item>
          <n-form-item label="数据库用户名" path="db.userName">
            <n-input v-model:value="formValue.db.userName" placeholder="数据库用户名" />
          </n-form-item>
          <n-form-item label="数据库名" path="db.dbName">
            <n-input v-model:value="formValue.db.dbName" placeholder="数据库名" />
          </n-form-item>
          <n-form-item label="数据库密码" path="db.password">
            <n-input v-model:value="formValue.db.password" type="password" placeholder="数据库密码(没有则空)" />
          </n-form-item>

          <n-form-item>
            <n-button attr-type="submit" @click="handleValidateClick"> 验证 </n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks';
import { fetchInitDb, fetchcheckDB } from '@/api';

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   *
   */
}

// loading
const { loading, startLoading, endLoading } = useLoading(false);

// from 表单
const size = ref<'small' | 'medium' | 'large'>('medium');
const formValue = ref({
  db: {
    type: '',
    host: '',
    port: '',
    userName: '',
    password: '',
    dbName: ''
  }
});

const rules = reactive({
  db: {
    type: {
      required: true,
      message: '请输入类型',
      trigger: 'blur'
    },
    host: {
      required: true,
      message: '请输入数据库地址',
      trigger: ['input', 'blur']
    },
    port: {
      required: true,
      message: '请输入端口号',
      trigger: 'blur'
    },
    userName: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    dbName: {
      required: true,
      message: '请输入数据库名',
      trigger: 'blur'
    }
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input']
  }
});

// select 选择框
const options = [
  {
    label: 'mysql',
    value: 'mysql',
    disabled: false
  }
];

const props = withDefaults(defineProps<Props>(), {});
interface Emits {
  (e: 'update:visible', visible: boolean): void;
}
const emit = defineEmits<Emits>();
const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});

const handleValidateClick = async () => {
  startLoading();
  const { data } = await fetchInitDb(formValue.value.db);
  if (data) {
    setTimeout(async () => {
      const res = await fetchcheckDB();
      if (!res.data?.needInit) {
        location.reload();
        endLoading();
      }
    }, 1000);
  }
  endLoading();
};
</script>
