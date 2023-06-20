import { mockRequest } from '@/utils';

/**
 * 获取路由信息
 * @returns
 */
export function getAsyncRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId });
}
