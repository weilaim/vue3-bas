import { mockRequest } from '@/utils';
import type { ApiRoute } from '../typings/api';

/**
 * 获取路由信息
 * @returns
 */
export function getAsyncRoutes(userId: string) {
  // return request.post<MenuList.Menus | null>('/menu/getMenus');
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId });
}
