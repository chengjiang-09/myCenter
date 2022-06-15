export const getTime = () => {
  const nowTime = new Date()

  const Y = nowTime.getFullYear()
  const M = fullTime(nowTime.getMonth() + 1)
  const D = fullTime(nowTime.getDate())

  return `${Y}-${M}-${D}`
}

const fullTime = (num) => {
  return num <= 9 ? `0${num}` : num
}
