import { decrypto, encrypto } from '@/utils';

interface StorageData {
  value: unknown;
  expire: number | null;
}

/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * 设置缓存
 * @param key key
 * @param value 缓存的值
 * @param expire 过期时间
 */
export function setLocal(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
  const storeageData: StorageData = { value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null };
  const json = encrypto(storeageData);
  window.localStorage.setItem(key, json);
}

/**
 * 获取缓存
 * @param key 缓存key
 * @returns StoregeData
 */
export function getLocal<T>(key: string) {
  const json = window.localStorage.getItem(key);
  if (json) {
    let storageData: StorageData | null = null;
    try {
      storageData = decrypto(json);
    } catch (error) {}
    if (storageData) {
      const { value, expire } = storageData;
      /** 没有过期时间或者有效期内则直接返回 */
      if (expire === null || expire >= Date.now()) {
        return value as T;
      }
    }
    removeLocal(key);
    return null;
  }
  return null;
}

/**
 * 取得过期时间
 * @param key key
 * @returns 过期过期时间
 */
export function getLocalExpire(key: string): number | null {
  const json = window.localStorage.getItem(key);
  if (json) {
    let storageData: StorageData | null = null;
    try {
      storageData = decrypto(json);
    } catch (error) {}
    if (storageData) {
      const { expire } = storageData;
      return expire;
    }
    return null;
  }
  return null;
}
/**
 *
 * @param key 要删除的缓存的key
 */
export function removeLocal(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * 清除缓存
 */
export function clearLocal() {
  window.localStorage.clear();
}
