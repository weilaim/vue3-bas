import { getLoginModuleRegExp } from '@/utils';
import type { RouteType, RoutesType, RouteModule } from '@/typings/router';

/** 根路由 */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
};

// 固定的路由
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  // {
  //   name: 'dashboard',
  //   path: '/dashboard',
  //   component: 'basic',
  //   children: [
  //     {
  //       name: 'dashboard_analysis',
  //       path: '/dashboard/analysis',
  //       component: 'self',
  //       meta: {
  //         title: '分析页',
  //         requiresAuth: true,
  //         icon: 'icon-park-outline:analysis'
  //       }
  //     },
  //     {
  //       name: 'dashboard_workbench',
  //       path: '/dashboard/workbench',
  //       component: 'self',
  //       meta: {
  //         title: '工作台',
  //         requiresAuth: true,
  //         icon: 'icon-park-outline:workbench'
  //       }
  //     }
  //   ],
  //   meta: {
  //     title: '仪表盘',
  //     icon: 'mdi:monitor-dashboard',
  //     order: 1
  //   }
  // },
  {
    name: 'login',
    path: '/login',
    component: 'self',
    props: route => {
      const moduleType = (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType
      };
    },
    meta: {
      title: '登录',
      dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
      singleLayout: 'blank'
    }
  },
  {
    name: 'constant-page',
    path: '/constant-page',
    component: 'self',
    meta: {
      title: '固定页面',
      icon: 'mdi:link-variant',
      order: 3,
      singleLayout: 'blank'
    }
  },
  {
    name: 'no-permission',
    path: '/no-permission',
    component: 'self',
    meta: {
      title: '无权限',
      singleLayout: 'blank'
    }
  },
  {
    name: 'not-found',
    path: '/not-found',
    component: 'self',
    meta: {
      title: '未找到',
      singleLayout: 'blank'
    }
  },
  {
    name: 'service-error',
    path: '/service-error',
    component: 'self',
    meta: {
      title: '服务器错误',
      singleLayout: 'blank'
    }
  },
  // 匹配无效路径的路由
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: 'blank',
    meta: {
      title: '未找到',
      singleLayout: 'blank'
    }
  }
];

export const NOT_FOUND_ROUTE: RouteType = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true
};

export const EMPTY_ROUTE: RouteType = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: () => {}
};

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule;
const asyncRoutes: RoutesType = [];
Object.keys(modules).forEach(key => {
  asyncRoutes.push(modules[key].default);
});

export { asyncRoutes };
