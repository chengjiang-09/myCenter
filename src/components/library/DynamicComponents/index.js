/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 11:22:33
 * @LastEditTime: 2022-03-17 11:24:36
 */
const componentList = require.context('./', true, /\.vue$/)

export default {
  install (app) {
    componentList.keys().forEach(key => {
      const component = componentList(key).default
      app.component(component.name, component)
    })
  }
}
