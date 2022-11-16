declare namespace AuthRoute {
  /** 多级路由分割符号 */
  type RouteSplitMark = '_';
  /** 路由的key */
  type RouteKey =
    // 固定的路由
    | 'root' // 根路由
    | 'login'
    | 'not-found'
    | 'no-permission'
    | 'service-error'
    | 'constant-page'
    | 'not-found-page' // 捕获无效path的路由
    // 自定义的路由
    | 'dashboard'
    | 'dashbard_analysis'
    | 'dashboard_workbench';

  /** 路由的path */
  type RoutePath =
    | '/'
    | Exclude<KeyToPath<RouteKey>, '/root' | 'not-found-page'>
    | SingleRouteParentPath
    | '/:pathMatch(.*)*';

  /** 单独一级路由的key(单独路由需要添加一个父级路由用于应用布局组件) */
  type SingleRouteKey = Exclude<
    GetSingleRouteKey<RouteKey>,
    GetRouteFirstParentKey<RouteKey> | 'root' | 'not-found-page'
  >;
  /** 单独路由父级路由的key */
  type SingleRouteParentKey = `${SingleRouteKey}-parent`;
  /** 单独路由父级路由path */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>;
  /** 路由key转换路由path */
  type KeyToPath<Key extends string> = Key extends `${infer Left}_${infer Right}`
    ? KeyToPath<`${Left}/${Right}`>
    : `/${Key}`;

  /** 获取一级路由(包括有子路由的一级路由) */
  type GetSingleRouteKey<Key extends RouteKey> = Key extends `${infer _Left}${RouteSplitMark}${infer _Right}`
    ? never
    : Key;

  /** 获取子路由的一级父路由 */
  type GetRouteFirstParentKey<Key extends RouteKey> = Key extends `${infer Left}${RouteSplitMark}${infer _Right}`
    ? Left
    : never;
}
