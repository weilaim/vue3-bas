import type { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { getToken, isNullOrWhitespace } from '@/utils';
import { basicRoutes, EMPTY_ROUTE } from './routes';

const isHash = import.meta.env.VITE_USE_HASH === 'true';
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export async function setupRouter(app: App) {
  await addDynamicRoutes();
  app.use(router);
}

export async function addDynamicRoutes() {
  const token = getToken();
  // 没有token的情况
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE);
  }

  // // 有token的情况
  // try {
  //   // const userStore = useUserStore()
  // } catch {}
}
