/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:14:21
 * @LastEditTime: 2022-03-19 17:29:21
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/styles/common.less'

// 我的组件
import myUI from '@/components/library/DynamicComponents'
import myMixin from '@/components/library/myMixin'
import myDirective from '@/components/library/MyGlobalProperties'

// import './mock'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.log(err)
  console.log(vm)
  console.log(info)
}

app.use(store).use(router).use(myUI).mixin(myMixin).use(myDirective).mount('#app')
