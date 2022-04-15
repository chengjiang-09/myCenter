export const tokenToUserInfo = (Mock) => {
  return Mock.mock(/\/getuserinfo/, 'post', (data) => {
    const responseData = JSON.parse(data.body)
    return {
      msg: '登录成功',
      result: {
        status: 1,
        id: 1,
        mobile: 18286427545,
        token: responseData.token,
        character: '管理员'
      }
    }
  })
}
