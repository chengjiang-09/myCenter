export const valiMobile = (Mobile) => {
  const reStr = /^1[3-9]\d{9}$/
  const re = new RegExp(reStr)
  return re.test(Mobile)
}
