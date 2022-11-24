import type { RouteType } from '~/src/typings/router';
const Layout = () => import('@/layout/index.vue');

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/unocss',

  meta: {
    title: '实例页面',
    customIcon: 'logo',
    role: ['admin'],
    order: 1,
    requireAuth: true
  },
  children: [
    {
      name: 'Unocss',
      path: 'Unocss',
      component: () => import('./unocss/index.vue'),
      meta: {
        title: 'unocss',
        icon: 'logos:unocss',
        role: ['admin']
      }
    },
    {
      name: 'Animation',
      path: 'animation',
      component: () => import('./animation/index.vue'),
      meta: {
        title: 'animation',
        icon: 'clarity:animation-line',
        role: ['admin']
      }
    },
    {
      name: 'Table',
      path: 'table',
      component: () => import('./table/index.vue'),
      meta: {
        title: '表格',
        icon: 'mdi:table',
        role: ['admin']
      }
    }
  ]
} as RouteType;
