export function getLoginModuleRegExp() {
  const modules: EnumType.LoginModuleKey[] = ['pwd-login', 'register', 'bind-wechat', 'code-login', 'reset-pwd'];
  return modules.join('|');
}
