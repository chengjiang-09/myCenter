export const mobileLogin = (Mock) => {
  return Mock.mock(/\/mobile\/login/, 'post', (data) => {
    const responseData = JSON.parse(data.body)
    if (responseData.code === '000000' && responseData.mobile === '18286427545') {
      return {
        msg: '登录成功',
        result: {
          status: 1,
          id: 1,
          mobile: 18286427545,
          token: Mock.mock('@integer'),
          character: '管理员'
        }
      }
    } else {
      return {
        msg: '手机号或短信验证码错误！',
        result: {
          status: 0
        }
      }
    }
  })
}
