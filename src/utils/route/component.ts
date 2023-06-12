import type { Component } from 'vue';
import { views } from '@/views';
import { BasicLayout, BlankLayout } from '@/layout';

type LayoutComponent = Record<EnumType.LayoutComponentName, () => Promise<Component>>;
/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param LayoutType
 */
export function getLayoutComponent(LayoutType: EnumType.LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout
  };

  return layoutComponent[LayoutType];
}

/**
 * 获取页面导入vue文件(懒加载方式)
 * @param routeKey
 */
export function getViewComponent(routeKey: AuthRoute.RouteKey) {
  if (!views[routeKey]) {
    window.console.error(`路由"${routeKey}"没有对应的组件文件!`);
  }

  return () => setViewComponentName(views[routeKey], routeKey) as Promise<Component>;
}

async function setViewComponentName(asyncComponent: () => Promise<Component>, name: string) {
  const component = (await asyncComponent()) as { default: Component };
  Object.assign(component.default, { name });
  return component;
}
