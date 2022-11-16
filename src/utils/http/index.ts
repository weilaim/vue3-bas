import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './reques';

const { url, urlPattern, secondUrl, secondUrlPattern } = getServiceEnvConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({ baseURL: isHttpProxy ? urlPattern : url });

/** 匹配路径的正则字符串，用于拦截地址转发代理(任意以/开头+字符串，单个/不起作用) */
export const secondRequest = createRequest({ baseURL: isHttpProxy ? secondUrlPattern : secondUrl });

export const mockRequest = createRequest({ baseURL: '/mock' });
