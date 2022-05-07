export const mobileCode = (Mock) => {
  return Mock.mock(/\/mobile\/code/, 'get', {
    msg: '验证信息接收成功！',
    result: {
      status: 1,
      code: '000000'
    }
  })
}

export const mobileLogin = (Mock) => {
  return Mock.mock(/\/mobile\/login/, 'post', (data) => {
    const responseData = JSON.parse(data.body)
    if (responseData.code === '000000' && responseData.mobile === '18286427545') {
      return {
        msg: '登录成功',
        result: {
          name: 'chengjiang_09',
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

export const passwordLogin = (Mock) => {
  return Mock.mock(/\/login/, 'post', (data) => {
    const responseData = JSON.parse(data.body)
    if (responseData.password === '000000' && responseData.mobile === '18286427545') {
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
        msg: '手机号或密码错误！',
        result: {
          status: 0
        }
      }
    }
  })
}
