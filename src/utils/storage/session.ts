import { encrypto, decrypto } from '@/utils';

/**
 * 设置session
 * @param key key
 * @param value 值
 */
export function setSession(key: string, value: unknown) {
  const json = encrypto(value);
  sessionStorage.setItem(key, json);
}

/**
 * 取得session
 * @param key
 * @returns
 */
export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key);
  let data: T | null = null;
  if (json) {
    try {
      data = decrypto(json);
    } catch {}
  }
  return data;
}

/**
 * 删除session
 * @param key
 */
export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

/**
 * 清除session
 */
export function clearSession() {
  window.sessionStorage.clear();
}
