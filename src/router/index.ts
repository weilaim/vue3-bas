import type { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { transformAuthRoutesToVueRoutes, transformRouteNameToRoutePath } from '@/utils';
import { setupRouterGuard } from './guard';
import { constantRoutes } from './routes';

const isHash = import.meta.env.VITE_USE_HASH === 'true';
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: transformAuthRoutesToVueRoutes(constantRoutes),
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export async function setupRouter(app: App) {
  // 路由守卫函数
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
}

export * from './utils';
export * from './routes';

/** 路由名称 */
export const routeName = (key: AuthRoute.RouteKey) => key;
/** 路由路径 */
export const routePath = (key: Exclude<AuthRoute.RouteKey, 'not-found-page'>) => transformRouteNameToRoutePath(key);
