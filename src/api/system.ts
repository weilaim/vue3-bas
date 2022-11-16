import { mockRequest } from '../utils';

/**
 * 登录
 * @param userName 用户名
 * @param password 密码
 * @returns
 */
export function fetchLogin(userName: string, password: string) {
  return mockRequest.post<ApiAuth.Token>('/login', { userName, password });
}

/**
 * 获取用户信息
 * @returns
 */
export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo');
}
