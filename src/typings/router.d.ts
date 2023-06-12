import type { RouteRecordRaw } from 'vue-router';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends AuthRoute.RouteMeta {}
}

interface Meta {
  title?: string;
  icon?: string;
  customIcon?: string;
  order?: number;
  role?: Array<string>;
  requireAuth?: boolean;
  keepAlive?: boolean;
  activeName?: string;
  defaultMenu?: boolean;
}

interface RouteItem {
  name: string;
  path: string;
  redirect?: string;
  isHidden?: boolean;
  meta?: Meta;
  children?: RoutesType;
  parameters?: [];
  parentId?: number;
  sort?: number;
  updated_at?: string;
  authoritys?: string;
  btns?: string;
  created_at?: string;
  deleted_at?: string;
  hidden?: boolean;
  id?: number;
  menuBtn?: string;
  menuid?: string;
}

// 菜单
declare namespace MenuList {
  interface Menus {
    menus: RoutesType;
  }
}

type RouteType = RouteRecordRaw & RouteItem;
type RoutesType = Array<RouteType>;
type RouteModule = Record<string, { default: RouteType }>;
