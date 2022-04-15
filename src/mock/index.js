import Mock from 'mockjs'

import { mobileCode, mobileLogin, passwordLogin } from './login'
import { tokenToUserInfo } from './tokenToUserInfo'

Mock.setup({
  timeout: '500-1000'
})

mobileCode(Mock)
mobileLogin(Mock)
passwordLogin(Mock)

tokenToUserInfo(Mock)
