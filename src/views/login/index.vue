<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useAuthStore } from '@/store';
// import { addDynamicRoutes } from '@/router';
import { useBoolean } from '@/hooks';
import { getLocal, removeLocal, setLocal } from '@/utils';
import { fetchcheckDB, fetchCaptCha } from '@/api';
import bgImg from '@/assets/images/login_bg.webp';
import InitModal from './components/InitModal.vue';

const { bool: visible, setTrue: openModal } = useBoolean();
const title: string = import.meta.env.VITE_APP_TITLE;
const auth = useAuthStore();
const { login } = useAuthStore();
// 是否初化数据库
const isInitDb = ref(false);

const loginInfo = ref<Auth.LoginInfo>({
  user_name: '',
  password: '',
  captcha: '',
  captchaId: ''
});

const localLoginInfo = getLocal('loginInfo') as Auth.LoginInfo;
if (localLoginInfo) {
  loginInfo.value.user_name = localLoginInfo.user_name || '';
  loginInfo.value.password = localLoginInfo.password || '';
}

const isRemember = useStorage('isRemember', false);

// 验证码相关
const captChaSrc = ref();

const loginVerify = () => {
  fetchCaptCha().then(async ele => {
    captChaSrc.value = ele.data?.picPath;
    loginInfo.value.captchaId = ele.data?.captchaId as string;
  });
};
loginVerify();
// 登录
async function handleLogin() {
  const { user_name, password, captcha } = loginInfo.value;
  if (!user_name || !password || !captcha) {
    window.$message?.warning('请输入用户名和密码');
  }
  try {
    login(loginInfo.value);
    if (isRemember.value) {
      setLocal('loginInfo', { user_name, password });
    } else {
      removeLocal('loginInfo');
    }
  } catch (error) {}
  // 清空之前的表单数据
  loginInfo.value.captcha = '';
  loginVerify();
}

const handleDialog = () => {
  openModal();
};

const handleInit = () => {
  handleDialog();
};

// 初始化数据库
const checkDB = async () => {
  const { data } = await fetchcheckDB();
  isInitDb.value = data?.needInit as boolean;
  // isInitDb.value = d;
};
onMounted(() => {
  checkDB();
});
</script>
<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div v-if="!isInitDb" m-auto min-w-345 p-15 f-c-c rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60>
      <div w-380 px-20 py-35>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col  px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a">
          <div mr-30><icon-local-logo /></div>
          {{ title }}
        </h5>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.user_name"
            autofocus
            class="text-16 items-center h-50 pl-10"
            placeholder="admins"
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
            ></n-input>
          </div>
          <div mt-30 flex>
            <div>
              <n-input v-model:value="loginInfo.captcha" placeholder="验证码" @keydown.enter="handleLogin" />
            </div>
            <div>
              <n-image width="100" bg-white preview-disabled :src="captChaSrc" @click="loginVerify()" />
            </div>
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
    <InitModal v-model:visible="visible" />
    <div v-if="isInitDb" m-auto min-w-345 p-15 f-c-c rounded-10 card-shadow bg-white dark:bg-dark bg-opacity-60>
      <div mt-19 m-30 w-345>
        <h1 text-25 mb-20 m-10>检测到您还未初始化数据库</h1>
        <n-button w-full p-30 h-50 rounded-5 text-16 type="primary" :loading="auth.loginLoading" @click="handleInit"
          >点击初始化数据库</n-button
        >
      </div>
    </div>
  </AppPage>
</template>
<style lang="scss" scoped></style>
