/** 后端接口的返回数据类型 */
declare namespace ApiAuth {
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}
