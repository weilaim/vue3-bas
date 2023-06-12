/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnv: ServiceEnv = {
  dev: {
    url: 'http://172.24.53.25:8888',
    urlPattern: '/url-pattern',
    secondUrl: 'http://172.24.53.25:8888',
    secondUrlPattern: '/second-url-pattern'
  },
  test: {
    url: 'http://172.21.254.176:8888',
    urlPattern: '/url-pattern',
    secondUrl: 'http://172.21.254.176:8888',
    secondUrlPattern: '/second-url-pattern'
  },
  prod: {
    url: 'http://172.21.254.176:8888',
    urlPattern: '/url-pattern',
    secondUrl: 'http://172.21.254.176:8888',
    secondUrlPattern: '/second-url-pattern'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return config;
}
