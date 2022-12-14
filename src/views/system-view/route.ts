import type { RouteType } from '~/src/typings/router';
const Layout = () => import('@/layout/index.vue');

export default {
  name: 'management',
  path: '/management',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'carbon:cloud-service-management',
    order: 9,
    role: ['admin']
  },
  children: [
    {
      name: 'management_auth',
      path: 'management/auth',
      component: () => import('./auth/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'ic:baseline-security',
        role: ['admin']
      }
    },
    {
      name: 'management_role',
      path: 'management/role',
      component: () => import('./role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'carbon:user-role',
        role: ['admin']
      }
    },
    {
      name: 'management_user',
      path: 'management/user',
      component: () => import('./user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'ic:round-manage-accounts',
        role: ['admin']
      }
    }
  ]
} as RouteType;
