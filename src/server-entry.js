// 服务户端

import createApp from './main'

// 需要调用当前文件  产生一个vue实例
export default () => {
  const { app } = createApp()
  return app
}

// 服务端配置好后 需要导出给node的使用

// 打包出来
// (function () {
//   export default () => {
//     const { app } = createApp()
//     return app
//   }
// })()