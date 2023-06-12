import { EnumStorageKey } from '@/enum';

/**
 * 获取缓存的主题颜色
 * @returns
 */
export function getThemeColor() {
  return window.localStorage.getItem(EnumStorageKey['theme-color']);
}

/**
 * 缓存主题颜色
 * @param color
 */
export function setThemeColor(color: string) {
  window.localStorage.setItem(EnumStorageKey['theme-color'], color);
}
