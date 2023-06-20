import { router } from '@/router';
import { usePermissionStore, useUserStore } from '@/store';
import { getToken, isNullOrWhitespace } from '@/utils';
import type { RoutesType, RouteType } from '@/typings/router';
import { EMPTY_ROUTE, NOT_FOUND_ROUTE } from './../routes/index';

/**
 * 动态路由
 */
export async function addDynamicRoutes() {
  const token = getToken();
  // 没有token的情况
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE);
  }
  // 有token的情况
  /** 处理动态路由（后端返回的路由） */

  try {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    // eslint-disable-next-line no-unused-expressions
    // userid 不存在，则直接调用接口根据token获取信息
    // !userStore.userId && (await userStore.getUser());
    // 根据环境变量中的值决定前端生成路由还是后端路由
    // const accessRoutes = JSON.parse(import.meta.env.VITE_BACK_ROUTER)
    // ? permissionStore.generateRoutes(userStore.role) // 前端生成路由
    //   : await permissionStore.generateRoutesBack(); // 后端生成路由
    const accessRoutes = permissionStore.generateRoutes(userStore.role);
    // 处理成前端的格式
    accessRoutes.forEach((route: RouteType) => {
      // eslint-disable-next-line no-unused-expressions
      !router.hasRoute(route.name) && router.addRoute(route);
    });
    // eslint-disable-next-line no-unused-expressions
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name);
    router.addRoute(NOT_FOUND_ROUTE);
  } catch (error) {}
}

// export async function initRouter() {
// if (routeList.length === 0) {
//   // 用户已登录，但不存在动态路由，说明页面存在刷新
//   usePermissionStoreHook().generateRoutes(routeList);
// } else {
//   console.log('----------');
//   usePermissionStoreHook().generateRoutes(routeList);
//   console.log('----------');
// }
//   return new Promise(resolve => {
//     // 请求后端的路由数据
//     getAsyncRoutes().then(({ data }) => {
//       console.log('data-getAs-data');

//       const menus = data?.menus;
//       handleAsyncRoutes(cloneDeep(menus));
//       resolve(router);
//     });
//   });
// }

/**
 * 处理后端返回的路由
//  * @param routeList
 */
// export function handleAsyncRoutes(routeList: RouteType[]) {
//   // 用户已登录，但不存在动态路由，说明页面存在刷新
//   if (routeList.length === 0) {
//     usePermissionStoreHook().generateRoutes(routeList);
//   } else {
//     console.log('处理看看是到哪个位置了');
//   }
// }
/** 路由名称 */
// export const routeName = (key: AuthRoute.RouteKey) => key;
/** 路由路径 */
// export const routePath = (key:Exclude<AuthRoute.RouteKey,'not-found-page'>)=>
/**
 * 重置路由
//  */
// export async function resetRouter() {
//   const basicRouteNames = getRouteNames(basicRoutes);
//   router.getRoutes().forEach(route => {
//     const name = route.name as string;
//     if (!basicRouteNames.includes(name)) router.removeRoute(name);
//   });
// }

export function getRouteNames(routes: RoutesType) {
  return routes.map(route => getRouteName(route)).flat(1);
}

function getRouteName(route: RouteType) {
  const names = [route.name];
  if (route.children && route.children.length)
    names.push(...route.children.map(item => getRouteName(item as RouteType)).flat(1));
  return names;
}

/**
 * 从sessionStorage 中取出当前登录用户角色roles，过滤无权限的菜单
 * @param data
 */
// export function filterNoPermissionTree(data: RouteComponent[]) {
//   const currentRoles =
//     getSession()
// }
