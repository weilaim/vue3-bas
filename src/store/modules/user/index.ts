import { defineStore } from 'pinia';
import { resetRouter } from '@/router';
import { removeToken, toLogin } from '@/utils';
import api from '@/api';
import { useTabStore } from '../tab';
import { usePermissionStore } from './../permission/index';
// import { usePermissionStore } from '../permission';
interface UserInfo {
  id?: string;
  name?: string;
  avatar?: string;
  role?: Array<string>;
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo>{}
    };
  },
  getters: {
    userId(): string {
      return this.userInfo.id || '';
    },
    name(): string {
      return this.userInfo.name || '';
    },
    avatar(): string {
      return this.userInfo.avatar || '';
    },
    role(): Array<string> {
      return this.userInfo.role || [];
    }
  },
  actions: {
    /**
     * 获取用户信息
     * @returns
     */
    async getUserInfo() {
      try {
        // 请求用户数据
        const res: any = await api.getUser;
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data;
          this.userInfo = { id, name, avatar, role };
          return Promise.resolve(res.data);
        }
        return Promise.reject(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 退出登录
     */
    logout() {
      const { resetTabs } = useTabStore();
      const { resetPermission } = usePermissionStore();
      removeToken();
      resetPermission();
      resetTabs();
      resetRouter();
      this.$reset();
      toLogin();
    }
  }
});
