import type { Router } from 'vue-router';
// import { useRouterPush } from '@/composables';
import { getToken, isNullOrWhitespace } from '@/utils';
// const { routerPush } = useRouterPush();
const WHITE_LIST = ['/login'];
export function createPermissionGuard(router: Router) {
  router.beforeEach(async to => {
    const token = getToken();
    /** 没有token的情况 */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true;
      // return routerPush('login');
      return { path: 'login', query: { ...to.query, redirect: to.path } };
    }
    /** 有token的情况 */
    if (to.path === '/login') return { path: '/' };
    // refreshAccessToken();
    return true;
  });
}
