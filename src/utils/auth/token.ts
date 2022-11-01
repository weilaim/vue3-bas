import { getLocal, removeLocal, setLocal } from '@/utils';
// token code
const TOKEN_CODE = 'access_token';

/** token的过期时间 6小时 */
const DURATION = 6 * 60 * 60;

/**
 * 取token
 * @returns token
 */
export function getToken() {
  return getLocal(TOKEN_CODE);
}

/**
 * 设置token
 * @param token string
 */
export function setToke(token: string) {
  setLocal(TOKEN_CODE, token, DURATION);
}

/**
 * 移除token
 */
export function removeToken() {
  removeLocal(TOKEN_CODE);
}

// export async function refreshAccessToken() {
//   const expire: number | null = getLocalExpire(TOKEN_CODE);
//   /** token 没有过期时间或者token离过期时间超过30分钟则不执行刷新 */
//   if (!expire || expire - new Date().getTime() > 1000 * 60 * 30) return;

//   // try {
//   //   // TO这里预留api刷新的T;
//   //   // const res :any = await ap
//   // } catch {} // 无感刷新，有异常也不提示}
// }
