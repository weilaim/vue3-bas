<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useAuthStore } from '@/store';
// import { addDynamicRoutes } from '@/router';
import { getLocal, removeLocal, setLocal } from '@/utils';
import bgImg from '@/assets/images/login_bg.webp';

const title: string = import.meta.env.VITE_APP_TITLE;
const auth = useAuthStore();
const { login } = useAuthStore();
interface LoginInfo {
  name: string;
  password: string;
}

const loginInfo = ref<LoginInfo>({
  name: '',
  password: ''
});

const localLoginInfo = getLocal('loginInfo') as LoginInfo;
if (localLoginInfo) {
  loginInfo.value.name = localLoginInfo.name || '';
  loginInfo.value.password = localLoginInfo.password || '';
}

const isRemember = useStorage('isRemember', false);
async function handleLogin() {
  const { name, password } = loginInfo.value;
  if (!name || !password) {
    window.$message?.warning('请输入用户名和密码');
  }
  try {
    login(name, password);
    if (isRemember.value) {
      setLocal('loginInfo', { name, password });
    } else {
      removeLocal('loginInfo');
    }
  } catch (error) {
    console.log('error', error);
  }
}
</script>
<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div m-auto min-w-345 p-15 f-c-c rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60>
      <div w-380 px-20 py-35>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a"><icon-local-logo mr-30 text-30 color-primary />{{ title }}</h5>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.name"
            autofocus
            class="text-16 items-center h-50 pl-10"
            placeholder="admin"
            :maxlength="20"
          ></n-input>
          <div mt-30>
            <n-input
              v-model:value="loginInfo.password"
              type="password"
              class="text-16 items-center h-50 pl-10"
              show-password-on="mousedown"
              placeholder="123456"
              :maxlength="20"
              @keydown.enter="handleLogin"
            ></n-input>
          </div>
          <div mt-20>
            <n-checkbox
              :checked="isRemember"
              label="记住我"
              :on-update-checked="(val:boolean)=>(isRemember=val)"
            ></n-checkbox>
          </div>
          <div mt-20>
            <n-button w-full h-50 rounded-5 text-16 type="primary" :loading="auth.loginLoading" @click="handleLogin"
              >登录</n-button
            >
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>
<style lang="scss" scoped></style>
