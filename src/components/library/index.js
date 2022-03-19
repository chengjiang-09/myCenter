/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 11:22:33
 * @LastEditTime: 2022-03-17 11:24:36
 */
import DynamicVidoe from '@/components/library/DynamicVidoe'

export default {
  install (app) {
    app.component(DynamicVidoe.name, DynamicVidoe)
  }
}
