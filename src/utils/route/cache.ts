import type { RouteRecordRaw } from 'vue-router';

export function getCacheRoute(routes: RouteRecordRaw[]) {
  const cacheNames: string[] = [];
  routes.forEach(route => {
    // 只需要获取二级路由的缓存的组件名
    if (hasChildren(route)) {
      (route.children as RouteRecordRaw[]).forEach(item => {
        if (isKeepAlive(item)) {
          cacheNames.push(item.name as string);
        }
      });
    }
  });
  return cacheNames;
}

function isKeepAlive(route: RouteRecordRaw) {
  return Boolean(route?.meta?.keepAlive);
}

/**
 * 是否有二级路由
 * @param route
 * @returns
 */
function hasChildren(route: RouteRecordRaw) {
  return Boolean(route.children && route.children.length);
}
