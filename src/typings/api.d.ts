/** 后端接口的返回数据类型 */
declare namespace ApiAuth {
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;

  interface CpatCha {
    /** 验证码 */
    captchaLength: number;
    /** 验证码id */
    captchaId: string;
    /** 路径 */
    picPath: string;
  }
}

declare namespace ApiRoute {
  /** 动态路由 */
  interface Route {
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.RouteKey;
  }
}

// 验证数据库
declare namespace CheckDB {
  interface DbVali {
    needInit: boolean;
  }
  interface DB {
    type: string;
    host: string;
    port: string;
    userName: string;
    password: string;
    dbName: string;
  }
}

declare namespace ApiUserManagements {
  interface User {
    id?: string;
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
