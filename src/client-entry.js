// 客户端

import createApp from './main'

const {app, router, store} = createApp()

// 如果浏览器执行的时候，需要将服务端最新的状态替换掉客户端的
if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')