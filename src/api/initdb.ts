import { request } from '../utils';

/**
 * 检验db
 * @returns
 */
export function fetchcheckDB() {
  return request.post<CheckDB.DbVali>('/init/checkdb');
}

/**
 * 初始化数据库
 * @returns
 */
export function fetchInitDb(data: CheckDB.DB) {
  return request.post<CheckDB.DB>('/init/initdb', data);
}
