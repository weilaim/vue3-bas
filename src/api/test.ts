import type { RequestConfig } from '../typings/axios';
import { request } from './../utils/http/index';
export function apiTest() {
  return request.get('/test', { noNeedToken: true, noNeedTip: true } as RequestConfig);
}
