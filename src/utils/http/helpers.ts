// import { useAuthStore } from '@/store;
import type { ErrorResolveResponse } from '@/typings/axios';
// import { AxiosRequestConfig } from 'axios';

// export async function handleRefreshToken(axiosConfig:AxiosRequestConfig) {
// const {resetAuthStore } = useAuthStore()
// }

export class AxiosRejectError extends Error {
  code?: number | string;

  dada?: any;

  constructor(rejectData: ErrorResolveResponse, options?: ErrorOptions) {
    const { code, message, data } = rejectData;
    super(message, options);
    this.code = code;
    this.dada = data;
  }
}

export function resolveResError(code: number | string | undefined, message = ''): string {
  switch (code) {
    case 400:
      // eslint-disable-next-line no-param-reassign
      message = message ?? '请求参数错误';
      break;
    case 401:
      // eslint-disable-next-line no-param-reassign
      message = message ?? '登录已过期';
      // useUserStore().logout();
      break;
    case 403:
      // eslint-disable-next-line no-param-reassign
      message = message ?? '没有权限';
      break;
    case 404:
      // eslint-disable-next-line no-param-reassign
      message = message ?? '资源或接口不存在';
      break;
    case 500:
      // eslint-disable-next-line no-param-reassign
      message = message ?? '服务器异常';
      break;
    default:
      // eslint-disable-next-line no-param-reassign
      message = message ?? `【${code}】: 未知异常!`;
      break;
  }
  return message;
}
