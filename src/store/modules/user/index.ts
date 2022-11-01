import { defineStore } from 'pinia';
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
    // async getUserInfo() {
    //   try {
    //     // 请求用户数据
    //     const res: any = await api.getUser;
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // }
    // async logout() {
    //   const { resetTabs } = useTabStore();
    //   const { resetPermission } = usePermissionStore();
    // }
  }
});
