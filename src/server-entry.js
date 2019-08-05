// 服务户端

import createApp from './main'
import { resolve } from 'any-promise';

// 需要调用当前文件  产生一个vue实例
export default (context) => {
  // 涉及到异步组件的问题 做好返回一个promise
  // const { app, router } = createApp()
  // router.push(context.url)
  // return app
  
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    router.onReady(() => {
      let matchs = router.getMatchedComponents()
      if (matchs.length === 0) {
        reject({code: 404})
      } else {
        resolve(app)
      }
    }, reject)
  })

}

// 服务端配置好后 需要导出给node的使用

// 打包出来
// (function () {
//   export default () => {
//     const { app } = createApp()
//     return app
//   }
// })()