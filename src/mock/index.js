import Mock from 'mockjs'

import { mobileCode } from './mobileCode'
import { mobileLogin } from './mobileLogin'
import { passwordLogin } from './passwordLogin'

Mock.setup({
  timeout: '500-1000'
})

mobileCode(Mock)

mobileLogin(Mock)

passwordLogin(Mock)

// Mock.mock(/\/my\/test/, 'get', () => {
//   return {
//     status: 1,
//     msg: '测试接口',
//     result: {

//     }
//   }
// })
