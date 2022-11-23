import { EnumDataType } from '@/enum';

export function isNumber(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.number;
}
export function isString(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.string;
}
export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.boolean;
}
export function isNull(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.null;
}
export function isUndefined(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.undefined;
}
export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.object;
}
export function isArray(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.array;
}
export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.date;
}
export function isRegExp(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.regexp;
}
export function isSet(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.set;
}
export function isMap(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.map;
}
export function isFile(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.file;
}

/** null or undefined or 空字符 */
export function isNullOrWhitespace(val: any): boolean {
  return isNullOrUndef(val) || isWhitespace(val);
}

export function isWhitespace(val: any): boolean {
  return val === '';
}

/** null or undefined */
export function isNullOrUndef(val: any): boolean {
  return isNull(val) || isUndef(val);
}

export function isUndef(val: any): boolean {
  return typeof val === 'undefined';
}

export function isUrl(path: string): boolean {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
