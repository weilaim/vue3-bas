import { defineStore } from 'pinia';
import { ROOT_ROUTE, constantRoutes, router } from '@/router';
import {
  getCacheRoute,
  getConstantRouteNames,
  getUserInfo,
  transformAuthRouteToMenu,
  transformAuthRouteToVueRoute,
  transformAuthRoutesToSearchMenus,
  transformAuthRoutesToVueRoutes,
  transformRouteNameToRoutePath,
  transformRoutePathToRouteName
} from '@/utils';
import { getAsyncRoutes } from '~/src/api';
// import { useTabStore } from '../tab';

interface RouteState {
  /**
   * 权限路由模式：
   * -static 前端声明的静态
   * -dynamic 后端声明的动态路由
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: AuthRoute.RouteKey;
  /** 菜单 */
  menus: GlobalMenuOption[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: []
  }),
  actions: {
    async initAuthRoute() {
      // 初始化首页标签路由
      // const { initHomeTab } = useTabStore(); 可以先略过后面在调整
      // 获取用户id
      const { id } = getUserInfo();

      if (!id) return;
      const isDynamicRoute = this.authRouteMode === 'dynamic';

      if (isDynamicRoute) {
        console.log('动态');
        await this.initDynamicRoute();
      } else {
        console.log('静态');
        await this.initStaticRoute();
      }
    },
    /**
     * 处理权限路由转成菜单
     * @param routes
     */
    // handleAuthRoutes(routes: AuthRoute.Route[]) {
    //   // (this.menus as GlobalMenuOpiton[]) =transformA
    // },
    /**
     * 动态路由模式下：更新路由重定向
     * @param routeKey
     */
    handleUpdateRootRedirect(routeKey: AuthRoute.RouteKey) {
      console.log('routeKey', routeKey);

      if (routeKey === 'root' || routeKey === 'not-found-page') {
        throw new Error('routeKey的值不能为root或者not-found-page');
      }

      const rootRoute: AuthRoute.Route = { ...ROOT_ROUTE, redirect: transformRouteNameToRoutePath(routeKey) };
      const rootRouteName: AuthRoute.RouteKey = 'root';
      router.removeRoute(rootRouteName);
      const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0];
      console.log('rootvueROUte', rootVueRoute);

      router.addRoute(rootVueRoute);
    },
    /**
     * 处理权限路由
     * @param routes
     */
    handleAuthRoutes(routes: AuthRoute.Route[]) {
      // 将权限路由转成菜单
      (this.menus as GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
      this.searchMenus = transformAuthRoutesToSearchMenus(routes);
      const vueRoutes = transformAuthRoutesToVueRoutes(routes);
      vueRoutes.forEach(route => {
        router.addRoute(route);
      });

      this.cacheRoutes = getCacheRoute(vueRoutes);
    },
    /**
     * 初始化动态路由
     */
    async initDynamicRoute() {
      const { id } = getUserInfo();
      const { data } = await getAsyncRoutes(id);
      console.log('data-dynamic', data);

      if (data) {
        this.routeHomeName = data.home;
        // 动态路由模式下更新跟路由的重定向
        this.handleUpdateRootRedirect(data.home);
        // 处理权限路由
        this.handleAuthRoutes(data.routes);
      }
    },
    /**
     * 初始静态路由
     */
    async initStaticRoute() {
      console.log('-------jing-------');
    },

    /**
     * 是否是有效的固定路由
     * @param name
     * @returns
     */
    isValidConstantRoute(name: AuthRoute.RouteKey) {
      const NOTFOUND_PAGE_NAME: AuthRoute.RouteKey = 'not-found-page';
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name) && name !== NOTFOUND_PAGE_NAME;
    }
  }
});
