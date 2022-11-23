import type { Meta, RouteType } from '@/typings/router';
import { renderIcon, renderLocalIcon } from './icon';
import { isUrl } from './typeof';

export function getMenuItem(route: RouteType, basePath = ''): GlobalMenuOpiton {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: getIcon(route.meta),
    order: route.meta?.order || 0
  } as GlobalMenuOpiton;

  const visibleChildren = route.children ? route.children.filter((item: RouteType) => item.name && !item.isHidden) : [];
  if (!visibleChildren.length) return menuItem;

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0];
    menuItem = {
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: getIcon(singleRoute.meta),
      order: menuItem.order
    } as GlobalMenuOpiton;
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item: RouteType) => item.name && !item.isHidden)
      : [];

    if (visibleItems.length === 1) menuItem = getMenuItem(visibleItems[0], menuItem.path);
    else if (visibleItems.length > 1)
      menuItem.children = visibleItems.map(item => getMenuItem(item, menuItem.path)).sort((a, b) => a.order - b.order);
  } else {
    menuItem.children = visibleChildren.map(item => getMenuItem(item, menuItem.path)).sort((a, b) => a.order - b.order);
  }

  return menuItem;
}

export function resolvePath(basePath: string, path: string) {
  if (isUrl(path)) return path;
  return `/${[basePath, path]
    .filter(pathf => Boolean(pathf) && pathf !== '/')
    .map(pathm => pathm.replace(/(^\/)|(\/$)/g, ''))
    .join('/')}`;
}

export function getIcon(meta?: Meta): (() => import('vue').VNodeChild) | null {
  if (meta?.customIcon) return renderLocalIcon(meta.customIcon, { size: 18 });
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
  return null;
}
