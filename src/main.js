import Vue from 'vue'
import creatRouter from './router'
import creatStore from './store'

import App from './App.vue'

// 入口文件 需要提供示例，客户端和服务端
// 如果是服务端渲染，每个人都应该有自己的vue示例
export default () => {
  const router = creatRouter()
  const store = creatStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }  
}
