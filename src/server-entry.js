// 服务户端

import createApp from './main'

// 需要调用当前文件  产生一个vue实例
export default (context) => {
  // 涉及到异步组件的问题 做好返回一个promise
  // const { app, router } = createApp()
  // router.push(context.url)
  // return app

  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      // 匹配到所有的组件
      let matchs = router.getMatchedComponents()
      if (matchs.length === 0) {
        reject({code: 404})
      } else {
        Promise.all(matchs.map(component => {
          if (component.asyncData) {
            return component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })).then(() => {
          context.state = store.state
          resolve(app)
        }).catch(reject)
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