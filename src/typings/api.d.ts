/** 后端接口的返回数据类型 */
declare namespace ApiAuth {
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

declare namespace ApiUserManagement {
  interface User {
    id: string;
    userName: string | null;
    age: number | null;
    gender: '0' | '1' | null;
    phone: string;
    email: string | null;
    /**
     * 用户状态
     * 1 启用
     * 2 禁用
     * 3 冻结
     * 4 软删除
     */
    userStatus: '1' | '2' | '3' | '4' | null;
  }
}
