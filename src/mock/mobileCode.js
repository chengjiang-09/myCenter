export const mobileCode = (Mock) => {
  return Mock.mock(/\/mobile\/code/, 'get', {
    status: 200,
    msg: '验证信息接收成功！',
    result: {
      code: '000000'
    }
  })
}
