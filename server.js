const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const VueServerRender = require('vue-server-renderer')

const app = new Koa()
const router = new Router()

let serverBundle = require('./dist/vue-ssr-server-bundle.json')

let clientManifest = require('./dist/vue-ssr-client-manifest.json')

let template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const render = VueServerRender.createBundleRenderer(serverBundle, {
  template: template,
  clientManifest // 渲染的时候可以自动找到客户端文件
})

router.get('/', async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString({url: '/'}, (err, data) => {
      if (err) reject(err)
      console.log(11, data)
      resolve(data)
    })
  })
})

app.use(router.routes())
app.use(static(path.join(__dirname, 'dist')))

// 如果服务器没有此路径
app.use(async ctx => {
  try{
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({url: ctx.url}, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }catch(e) {
    ctx.body = '404'
  }
})

app.listen(3000)
