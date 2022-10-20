import path from 'path';
/**
 *
 * 获取项目根目录
 * @des 末尾不带斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * 获取项目src路径
 * @param srcName -src 目录名称 default src
 * @returns
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath();
  return `${rootPath}/${srcName}`;
}
