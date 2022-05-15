export const onFocus = (app) => {
  app.directive('focus', {
    mounted (el) {
      console.log(el)
      el.focus()
    }
  })
}
