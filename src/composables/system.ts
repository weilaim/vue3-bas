interface AppInfo {
  /** 项目名称 */
  name: string;
  /** 项目标题 */
  title: string;
  /** 项目描述 */
  desc: string;
}

export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;
  return {
    name,
    title,
    desc
  };
}
