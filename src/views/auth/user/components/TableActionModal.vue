<script setup lang="ts">
import { computed } from 'vue';
import type { FormInst, FormItemRule } from 'naive-ui';
import { createRequiredFormRule, formRules } from '@/utils';
import { genderOptions, userStatusOptions } from '@/constants';

interface Props {
  /** 弹窗看见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add 新增
   * edit:编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格数据 */
  editData: UserManagement.User | null;
}

defineOptions({ name: 'TableActionModal' });
const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

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

// 取消
const closeModal = () => {
  modalVisible.value = false;
};

export type ModalType = NonNullable<Props['type']>;
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();
type FormModel = Pick<UserManagement.User, 'userName' | 'age' | 'gender' | 'phone' | 'email' | 'userStatus'>;
const formModel = reactive<FormModel>(createDefaultFormModel());

function createDefaultFormModel(): FormModel {
  return {
    userName: '',
    age: null,
    gender: null,
    phone: '',
    email: null,
    userStatus: null
  };
}
const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  userName: createRequiredFormRule('请输入用户名'),
  age: createRequiredFormRule('请输入年龄'),
  gender: createRequiredFormRule('请选择性别'),
  phone: formRules.phone,
  email: formRules.email,
  userStatus: createRequiredFormRule('请选择用户状态')
};
// 确定
async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success('新增成功');
  closeModal();
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };
  handlers[props.type]();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>
<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-550px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-form-item :span="12" label="用户名" path="username">
        <n-input v-model:value="formModel.userName" />
      </n-form-item>
      <n-form-item :span="12" label="年龄" path="age">
        <n-input-number v-model:value="formModel.age" clearable />
      </n-form-item>
      <n-form-item label="性别" path="gender">
        <n-radio-group v-model:value="formModel.gender">
          <n-radio v-for="item in genderOptions" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item :span="12" label="手机号" path="phone">
        <n-input v-model:value="formModel.phone" />
      </n-form-item>
      <n-form-item :span="12" label="邮箱" path="email">
        <n-input v-model:value="formModel.email" />
      </n-form-item>
      <n-form-item :span="12" label="状态" path="userStatus">
        <n-select v-model:value="formModel.userStatus" :options="userStatusOptions" />
      </n-form-item>

      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>
<style lang="scss" scoped></style>
