import { defineStore } from 'pinia';
import { addDynamicRoutes, resetRouter } from '@/router';
import { useRouterPush } from '@/composables';
import { clearAuthStorage, getToken, getUserInfo, setRefreshToken, setToken, setUserInfo, toLogin } from '@/utils';
import { fetchLogin, fetchUserInfo } from '@/api';
import { useTabStore } from '../tab';
import { usePermissionStore } from '../permission';
interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    },
    avatar(): string {
      return this.userInfo.avatar || 'https://miniwx.arf-to.cn/334050.jpg';
    },
    name(): string {
      return this.userInfo.userName || 'weilaim';
    }
  },
  actions: {
    /** 重置状态 */
    resetAuthStore() {
      // const { toLogin } = useRouterPush(false);
      // const {resetTabStore}
      // const {resetRouteStore} =
      // const route = unref(router.currentRoute);
      // clearAuthStorage();
      // this.$reset();
      // console.log('route', route.meta.requiresAuth);
      // if (route.meta.requiresAuth) {
      //   toLogin();
      // }
      // const route = unref(router.currentRoute)
      // if(route.meta.requ)
    },
    /**
     * 登录
     * @param userName
     * @param password
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;
      const { data } = await fetchLogin(userName, password);

      if (data) {
        await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken -返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const { toLoginRedirect } = useRouterPush(false);
      const loginSuccess = await this.loginByToken(backendToken);
      if (loginSuccess) {
        // 登录成功需要添加动态路由
        await addDynamicRoutes();
        // 跳转登录后的地址
        toLoginRedirect();

        // 登录后弹出欢迎提示
        window.$notification?.success({
          title: '欢迎回来',
          content: `欢迎回来,${this.userInfo.userName}`,
          duration: 3000
        });
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken 返回的token
     * @returns
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      let successFlag = false;
      // 先把token 存储到缓存中(后面接口请求头需要token)
      const { token, refreshToken } = backendToken;
      setToken(token);
      setRefreshToken(refreshToken);

      // 获取用户信息
      const { data } = await fetchUserInfo();
      if (data) {
        // 登录成功后把用户信息存储到缓存中
        setUserInfo(data);
        // 更新状态
        this.userInfo = data;
        this.token = token;
        successFlag = true;
      }
      return successFlag;
    },

    async logout() {
      const { resetTabs } = useTabStore();
      const { resetPermission } = usePermissionStore();
      clearAuthStorage();
      resetPermission();
      resetTabs();
      this.$reset();
      resetRouter();
      toLogin();
    }
  }
});
