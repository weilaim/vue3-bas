interface UserModel extends Auth.UserInfo {
  token:string
  refreshToken:string
  password:string
}

export const userModel:UserModel[]=[
  {
    token:'__TOKEN_SOYBEAN__',
    refreshToken:'__REFRESH_TOKEN_SOYBEAN__',
    userId:'0',
    userName:'weilaim',
    userRole:'super',
    password:'weilaim123',
    avatar:'https://miniwx.arf-to.cn/334050.jpg'
  },
  {
    token:'__TOKEN_SOYBEAN__',
    refreshToken:'__REFRESH_TOKEN_SOYBEAN__',
    userId:'1',
    userName:'小米',
    userRole:'admin',
    password:'weilaim123',
    avatar:'https://miniwx.arf-to.cn/334050.jpg'
  },
  {
    token:'__TOKEN_SOYBEAN__',
    refreshToken:'__REFRESH_TOKEN_SOYBEAN__',
    userId:'2',
    userName:'小米',
    userRole:'admin',
    password:'weilaim123',
    avatar:'https://miniwx.arf-to.cn/334050.jpg'

  },
  {
    token:'__TOKEN_SOYBEAN__',
    refreshToken:'__REFRESH_TOKEN_SOYBEAN__',
    userId:'3',
    userName:'admin',
    userRole:'user',
    password:'admin',
    avatar:'https://miniwx.arf-to.cn/334050.jpg'
  },

]