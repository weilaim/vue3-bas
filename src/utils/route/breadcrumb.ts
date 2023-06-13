/**
 * 获取面包屑数据
 * @param activeKey 当前页面路由的key
 * @param menus 菜单数据
 * @param routePath 跟路由路径
 */
export function getBreadcrumbByRoutekey(activeKey: string, menus: GlobalMenuOption[], rootPath: string) {
  const breadcrumbMenu = getBreadcrumbMenu(activeKey, menus);
  const breadcrumb = breadcrumbMenu.map(item => transformBreadcrumbMenuToBreadcrumb(item, rootPath));
  return breadcrumb;
}

/**
 * 根据菜单数据获取面包屑格式的菜单
 * @param activeKey 当前页面路由的key
 * @param menus 菜单数据
 */
function getBreadcrumbMenu(activeKey: string, menus: GlobalMenuOption[]) {
  const breadcrumbMenu: GlobalMenuOption[] = [];
  menus.some(menu => {
    const flag = activeKey.includes(menu.routeName as string);
    if (flag) {
      breadcrumbMenu.push(...getBreadcrumbMenuItem(activeKey, menu));
    }
    return flag;
  });

  return breadcrumbMenu;
}

/**
 * 根据单个菜单数据获取面包屑格式的菜单
 * @param activeKey 当前页面路由的key
 * @param menu - 单个菜单数据
 */
function getBreadcrumbMenuItem(activeKey: string, menu: GlobalMenuOption) {
  const breadcrumbMenu: GlobalMenuOption[] = [];
  if (activeKey === menu.routeName) {
    breadcrumbMenu.push(menu);
  }

  if (activeKey.includes(menu.routeName as string) && menu.children && menu.children.length) {
    breadcrumbMenu.push(menu);
    breadcrumbMenu.push(
      ...menu.children.map(item => getBreadcrumbMenuItem(activeKey, item as GlobalMenuOption)).flat(1)
    );
  }

  return breadcrumbMenu;
}

/**
 * 将面包屑格式的菜单数据转换成面包屑数据
 * @param menu  单个菜单数据
 * @param rootPath 跟路由路径 */
function transformBreadcrumbMenuToBreadcrumb(menu: GlobalMenuOption, rootPath: string) {
  const hasChildren = Boolean(menu.children && menu.children.length);
  const breadcrumb: GlobalBreadcrumb = {
    key: menu.routeName as string,
    label: menu.label,
    routeName: menu.routeName as string,
    disabled: menu.routePath === rootPath,
    hasChildren
  };
  if (menu.icon) {
    breadcrumb.icon = menu.icon;
  }
  if (hasChildren) {
    breadcrumb.children = menu.children?.map(item =>
      transformBreadcrumbMenuToBreadcrumb(item as GlobalMenuOption, rootPath)
    );
  }

  return breadcrumb;
}
