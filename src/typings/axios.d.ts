import type { AxiosRequestConfig } from 'axios';
interface RequestConfig extends AxiosRequestConfig {
  /** 接口是否需要token */
  noNeedToken?: boolean;
  /** 接口是否需要错误提示 */
  noNeedTip?: boolean;
}

interface ErrorResolveResponse {
  code?: number | string;
  message: string;
  data?: any;
}
