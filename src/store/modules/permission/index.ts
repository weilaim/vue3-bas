import { defineStore } from 'pinia';
import { store } from '@/store';
import type { RoutesType } from '@/typings/router';
import { asyncRoutes, constantRoutes } from './../../../router/routes/index';
import { filterAsyncRoutes } from './helpers';

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType>[],
      // 整体路由生成的菜单（静态/动态）
      wholeMenus: []
    };
  },
  getters: {
    routes(): RoutesType {
      return constantRoutes.concat(this.accessRoutes);
    },
    menus(): RoutesType {
      return this.routes.filter(route => route.name && !route.isHidden);
    }
  },
  actions: {
    /**
     * 前端组装生成权限菜单
     * @param role
     * @returns
     */
    generateRoutes(role: Auth.RoleTyep) {
      // 过滤没有权限的菜单

      // 获取路由然后过滤一些关于权限的问题
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },

    /**
     * 重置权限路由
     */
    resetPermission() {
      this.$reset();
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
