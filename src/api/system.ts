import { request } from '@/utils';

/**
 * 登录
 * @param userName 用户名
 * @param password 密码
 * @returns
 */

export function fetchLogin(formData: Auth.LoginInfo) {
  return request.post<ApiAuth.Token>('/base/login', formData);
}

/**
 * 获取用户信息
 * @returns
 */
export function fetchUserInfo() {
  return request.get<ApiAuth.ResUserInfo>('/user/getUserInfo');
}

/**
 * 获取验证码
 * @returns
 */
export function fetchCaptCha() {
  return request.post<ApiAuth.CpatCha>('/base/captcha');
}
