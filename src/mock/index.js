import Mock from 'mockjs'

import { mobileCode } from './mobileCode'
import { valiableMobileCode } from './valiableMobileCode'

Mock.setup({
  timeout: '500-1000'
})

mobileCode(Mock)

valiableMobileCode(Mock)

// Mock.mock(/\/my\/test/, 'get', () => {
//   return {
//     status: 1,
//     msg: '测试接口',
//     result: {

//     }
//   }
// })
