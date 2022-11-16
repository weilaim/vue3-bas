import type { AxiosError, AxiosResponse } from 'axios';
import type { RequestConfig } from '@/typings/axios';
import { getToken } from '../auth';
import { AxiosRejectError, resolveResError } from './helpers';

export function reqResoleve(config: RequestConfig) {
  // 处理不需要token的请求
  if (config.noNeedToken) {
    return config;
  }

  const token = getToken();
  if (!token) {
    return Promise.reject(new AxiosRejectError({ code: 401, message: '登录已过期清重新登录' }));
  }

  /**
   * * 加上token
   * ! 认证方案：JWT Bearer
   */
  const Authorization = config.headers?.Authorization || `Bearer ${token}`;
  if (config.headers) config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`;
  else config.headers = { Authorization };
  return config;
}

/**
 * 请求错误拦截
 * @param error
 * @returns Promise
 */
export function reqReject(error: AxiosError) {
  return Promise.reject(error);
}

/**
 * 响应拦截
 * @param response
 * @returns
 */
export function resResolve(response: AxiosResponse) {
  // eslint-disable-next-line no-warning-comments
  // TODO 处理不同的 response.headers
  const { data, status, config, statusText } = response;
  if (data?.code !== 200) {
    const code = data?.code ?? status;
    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, data?.message ?? statusText);
    const { noNeedTip } = config as RequestConfig;

    // eslint-disable-next-line no-unused-expressions
    !noNeedTip && window.$message?.error(message);
    return Promise.reject(new AxiosRejectError({ code, message, data: data || response }));
  }
  return Promise.resolve(data);
}

/**
 * 响应错误拦截
 * @param error
 * @returns
 */
export function resReject(error: AxiosError) {
  if (!error || !error.response) {
    const code = error?.code;
    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, error.message);
    window.$message?.error(message);
    return Promise.reject(new AxiosRejectError({ code, message, data: error }));
  }
  // const { data, status, config } = error.response;
  const { data, status, config } = error.response;
  let { code, message } = data as AxiosRejectError;
  code = code ?? status;
  message = message ?? error.message;
  message = resolveResError(code, message);
  /** 错误需要提醒 */
  const { noNeedTip } = config as RequestConfig;
  // eslint-disable-next-line no-unused-expressions
  !noNeedTip && window.$message?.error(message);
  return Promise.reject(new AxiosRejectError({ code, message, data: error.response?.data || error.response }));
}
