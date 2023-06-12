import type { Router } from 'vue-router';
import { createPermissionGuardRoute } from './permission';

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 动态路由

    await createPermissionGuardRoute(to, from, next);
    window.$loadingBar?.start();
  });

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar?.finish();
    }, 200);
  });

  router.onError(() => {
    window.$loadingBar?.error();
  });
}
