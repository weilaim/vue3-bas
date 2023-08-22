// import type { Auth } from '@/typings/business';

export const routeModel: Record<Auth.RoleTyep, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },
    
    {
      name: 'auth',
      path: '/auth',
      component: 'basic',
      children: [
        {
          name: 'auth_menu',
          path: '/auth/menu',
          component: 'self',
          meta: {
            title: '菜单管理',
            requiresAuth: true,
            icon: 'ic:round-construction'
          }
        },
        {
          name: 'auth_interface',
          path: '/auth/interface',
          component: 'self',
          meta: {
            title: '接口管理',
            requiresAuth: true,
            icon: 'ic:round-supervisor-account'
          }
        },
        {
          name: 'auth_role',
          path: '/auth/role',
          component: 'self',
          meta: {
            title: '角色管理',
            requiresAuth: true,
            icon: 'carbon:user-role'
          }
        },

        {
          name: 'auth_user',
          path: '/auth/user',
          component: 'self',
          meta: {
            title: '用户管理',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        },

      ],
      meta: {
        title: '权限管理',
        icon: 'ic:baseline-security',
        order: 5
      }
    },
   
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [  
        {
          name: 'management_web',
          path: '/management/web',
          component: 'self',
          meta: {
            title: '网站管理',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        },
        
      ],
      meta: {
        title: '系统管理',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 10
      }
    }
  ],
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },
  ],
  editor:[
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },
  ],
  user:[]
};
