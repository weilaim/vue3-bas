import { defineStore } from 'pinia';
import type { RoutesType } from '@/typings/router';

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType>[]
    };
  }
});
