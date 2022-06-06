export const valiEmail = (email) => {
  const reStr = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const re = new RegExp(reStr)
  return re.test(email)
}
