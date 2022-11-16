import { defineStore } from 'pinia';
import { resetRouter } from '@/router';
import { removeToken, toLogin } from '@/utils';
import { useTabStore } from '../tab';
import { usePermissionStore } from './../permission/index';
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
