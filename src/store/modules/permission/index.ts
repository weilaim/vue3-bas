import { defineStore } from 'pinia';
import type { RoutesType } from '@/typings/router';
import { asyncRoutes, basicRoutes } from './../../../router/routes/index';
import { filterAsyncRoutes } from './helpers';

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType>[]
    };
  },
  getters: {
    routes(): RoutesType {
      return basicRoutes.concat(this.accessRoutes);
    },
    menus(): RoutesType {
      return this.routes.filter(route => route.name && !route.isHidden);
    }
  },
  actions: {
    generateRoutes(role: Array<string> = []): RoutesType {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },
    resetPermission() {
      this.$reset();
    }
  }
});
