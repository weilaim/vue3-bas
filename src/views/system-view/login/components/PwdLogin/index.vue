<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui';
import { EnumLoginModule } from '@/enum';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { formRules } from '@/utils';
import { fetchCaptCha } from '@/api';

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();
const formRef = ref<HTMLElement & FormInst>();
const model = reactive({
  user_name: 'admin',
  password: '123456',
  captcha: '',
  captchaId: ''
});

const rules: FormRules = {
  password: formRules.pwd,
  captcha: formRules.code
};

/** 验证码 */
const captChaSrc = ref();
const loginVerify = () => {
  fetchCaptCha().then(async res => {
    const { data } = res;
    if (data) {
      captChaSrc.value = data.picPath;
      model.captchaId = data.captchaId;
    }
  });
};

loginVerify();

/** 记住我 */
const rememberMe = ref(false);
/** login */
async function handleSubmit() {
  await formRef.value?.validate();
  login(model);
}
</script>
<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="user_name">
      <n-input v-model:value="model.user_name" placeholder="用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>
    <n-form-item class="flex mb-20" path="captcha">
      <n-input v-model:value="model.captcha" placeholder="验证码" @keydown.enter="handleSubmit" />
      <n-image preview-disabled class="bg-white h-40px ml-10px" :src="captChaSrc" @click="loginVerify()" />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码?</n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
        >确定
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ EnumLoginModule['code-login'] }}
        </n-button>
        <div class="w-12px"></div>
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ EnumLoginModule.register }}
        </n-button>
      </div>
    </n-space>
  </n-form>
</template>
<style lang="scss" scoped></style>
