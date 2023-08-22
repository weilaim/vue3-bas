import type { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { getToken } from '@/utils';
import CustomAxiosInstance from './instance';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}
/**
 * 创建请求
 * @param axiosConfig axios配置
 * @param backendConfig -后端接口字段配置
 */
export function createRequest(axiosConfig: AxiosRequestConfig, backendConfig?: Service.BackendResultConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig);

  async function asyncRequest<T>(param: RequestParam): Promise<Service.RequestResult<T>> {
    const { url } = param;
    const method = param.method || 'get';
    const defConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { instance } = customInstance;
    const res = (await getRequestResponse({
      instance,
      method,
      url,
      data: param.data,
      config: defConfig
    })) as Service.RequestResult;

    return res;
  }

  /**
   * get请求
   * @param url -请求地址
   * @param config -axios配置
   * @returns
   */
  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param url -请求地址
   * @param data -请求的body的data
   * @param config -axios请求配置
   * @returns
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }

  /**
   * put请求
   * @param url -请求地址
   * @param data -请求body的data
   * @param config -axios配置
   * @returns
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param url -请求地址
   * @param config -axios配置
   * @returns
   */
  function handleDelete<T>(url: string, config: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
  async function getRequestResponse(params: {
    instance: AxiosInstance;
    method: RequestMethod;
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
  }) {
    const { instance, method, url, data, config } = params;
    let res: any;
    if (method === 'get' || method === 'delete') {
      res = await instance[method](url, config);
    } else {
      res = await instance[method](url, data, config);
    }
    return res;
  }
}
