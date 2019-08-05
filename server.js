const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const VueServerRender = require('vue-server-renderer')

const app = new Koa()
const router = new Router()

let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8')

let template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')


const render = VueServerRender.createBundleRenderer(serverBundle, {
  template: template
})

router.get('/', async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
})

app.use(router.routes())
app.use(static(path.join(__dirname, 'dist')))
app.listen(3000)
