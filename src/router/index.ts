import type { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// import { getToken, isNullOrWhitespace } from '@/utils';
import type { RoutesType, RouteType } from '@/typings/router';
// import { useUserStore } from './../store/modules/user/index';
// import { usePermissionStore } from './../store/modules/permission/index';
// import { EMPTY_ROUTE, basicRoutes, NOT_FOUND_ROUTE } from './routes/index';
// import { EMPTY_ROUTE, basicRoutes } from './routes/index';
import { basicRoutes } from './routes/index';
import { setupRouterGuard } from './guard';

const isHash = import.meta.env.VITE_USE_HASH === 'true';
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export async function setupRouter(app: App) {
  // await addDynamicRoutes();
  setupRouterGuard(router);
  app.use(router);
}

export async function addDynamicRoutes() {
  // const token = getToken();
  // 没有token的情况
  // if (isNullOrWhitespace(token)) {
  //   router.addRoute(EMPTY_ROUTE);
  // }
  // console.log('专业测试');
  // 有token的情况
  // try {
  //   const userStore = useUserStore();
  //   const permissionStore = usePermissionStore();
  //   // eslint-disable-next-line no-unused-expressions
  //   !userStore.userId && (await userStore.getUserInfo());
  //   const accessRoutes = permissionStore.generateRoutes(userStore.role);
  //   accessRoutes.forEach((route: RouteType) => {
  //     // eslint-disable-next-line no-unused-expressions
  //     !router.hasRoute(route.name) && router.addRoute(route);
  //   });
  //   // eslint-disable-next-line no-unused-expressions
  //   router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name);
  //   router.addRoute(NOT_FOUND_ROUTE);
  // } catch (error) {
  //   console.log('abcdalskfjlasjl');
  //   console.log('error', error);
  // }
}

export async function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes);
  router.getRoutes().forEach(route => {
    const name = route.name as string;
    if (!basicRouteNames.includes(name)) router.removeRoute(name);
  });
}

export function getRouteNames(routes: RoutesType) {
  return routes.map(route => getRouteName(route)).flat(1);
}

function getRouteName(route: RouteType) {
  const names = [route.name];
  if (route.children && route.children.length)
    names.push(...route.children.map(item => getRouteName(item as RouteType)).flat(1));
  return names;
}
