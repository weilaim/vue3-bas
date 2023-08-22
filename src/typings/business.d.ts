/** 用户相关模块 */

declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由群仙的控制)
   * -super:超级管理员(该权限具有所有路由数据)
   * -admin:管理员
   * -user:用户
   * -custom:自定义角色
   */

  type RoleTyep = keyof typeof import('@/enum').EnumUserRole;

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    id: string;
    /** 颜色 */
    activeColor?: string;
    /** authorityId */
    authorityId?: string;
    baseColor?: string;
    email?: string;
    nickName?: string;
    /** 是否启用账号 */
    enable?: boolean;
    phone?: string;
    sideMode?: string;
    uuid?: string;
    /** 用户名 */
    /** 用户角色类型 */
    userRole?: RoleTyep;
    /** 头像 */
    headerImg?: string;
  }

  /** 登录信息 */
  interface LoginInfo {
    username: string;
    password: string;
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagements.User {
    /** 序号 */
    index: number;
    /** 表格的key(id) */
    key?: string;
  }

  /**
   * 用户性别
   * 0 女
   * 1 男
   */
  type GenderKey = NonNullable<User['gender']>;

  /**
   * 用户状态
   * 1:启用
   * 2:禁用
   * 3:冻结
   * 4：软删除
   */
  type UserStatusKey = NonNullable<User['userStatus']>;
}
