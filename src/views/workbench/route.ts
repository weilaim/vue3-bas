import type { RouteType } from '@/typings/router';
const Layout = () => import('@/layout/index.vue');

export default {
  name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: '/workbench',
  children: [
    {
      name: 'Workbench',
      path: 'workbench',
      component: () => import('./index.vue'),
      meta: {
        icon: 'mdi:home',
        title: '工作台',
        order: 0
      }
    }
  ]
} as RouteType;
