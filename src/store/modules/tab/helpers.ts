import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router';
import { EnumStorageKey } from '@/enum';
import { getLocal, getSession, setLocal } from '@/utils';
export const activeTab = getSession('activeTab');
// export const tabs = getSession('tabs');
export const WITHOUT_TAB_PATHS = ['/404', '/login'];

/**
 * 根据vue路由获取tab路由
 * @param route
 * @returns
 */
export function getTabRouteByVueRoute(route: RouteRecordNormalized | RouteLocationNormalized) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;

  const tabRoute: GlobalTabRoute = {
    name: route.name,
    fullPath,
    meta: route.meta,
    scrollPosition: {
      left: 0,
      top: 0
    }
  };
  return tabRoute;
}

/**
 * 判断路由是否有fullPath属性
 * @param route
 * @returns
 */
function hasFullPath(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

/** 清空/缓存 多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  setLocal(EnumStorageKey['multi-tab-routes'], data);
}

/**
 * 根据路由名字获取该多页签数据中的索引
 * @param tabs
 * @param routeName
 */
export function getIndexInTabRoutesByRouteName(tabs: GlobalTabRoute[], routeName: string) {
  return tabs.findIndex(tab => tab.name === routeName);
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  const routes: GlobalTabRoute[] = [];
  const data = getLocal<GlobalTabRoute[]>(EnumStorageKey['multi-tab-routes']);
  if (data) {
    const defaultTabRoutes = data.map(item => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0
      }
    }));
    routes.push(...defaultTabRoutes);
  }

  return routes;
}
/**
 * 获取该页签在多页签数据中的索引
 * @param tabs
 * @param fullPath
 * @returns
 */
export function getIndexInTabRoutes(tabs: GlobalTabRoute[], fullPath: string) {
  return tabs.findIndex(tab => tab.fullPath === fullPath);
}

/**
 * 判断该页签是否在多页签数据中
 * @param tabs
 * @param fullPath
 * @returns
 */
export function isInTabRoutes(tabs: GlobalTabRoute[], fullPath: string) {
  return getIndexInTabRoutes(tabs, fullPath) > -1;
}
