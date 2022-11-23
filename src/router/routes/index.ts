import type { RouteType, RoutesType, RouteModule } from '@/typings/router';

const Layout = () => import('@/layout/index.vue');

export const basicRoutes: RoutesType = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    isHidden: true
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页'
    }
  },
  {
    name: 'ExternalLink',
    path: '/external-link',
    component: Layout,
    meta: {
      title: '外部连接',
      icon: 'mdi:link-variant',
      order: 3
    },
    children: [
      {
        name: 'linkGithubSrc',
        path: 'https://github.com/zclzone/qs-admin',
        component: () => {},
        meta: {
          title: '源码-github',
          icon: 'mdi:github'
        }
      },
      {
        name: 'linkMiniarf',
        path: 'https://mini.arf-to.cn',
        component: () => {},
        meta: {
          title: 'arf-to站点',
          icon: 'simple-icons:gatling'
        }
      }
    ]
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
