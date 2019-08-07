const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

const app = new Koa()
const router = new Router()

let render = null
let readyPromise = null
const templatePath = resolve('./dist/index.ssr.html')
function createRender(serverBundle, options) {
  // render = createBundleRenderer(serverBundle, {
  //   template: template,
  //   clientManifest // 渲染的时候可以自动找到客户端文件
  // })
  return createBundleRenderer(serverBundle, options)
}


if (isProd) {
  let template = fs.readFileSync(templatePath, 'utf-8')
  let serverBundle = require('./dist/vue-ssr-server-bundle.json')
  let clientManifest = require('./dist/vue-ssr-client-manifest.json')

  render = createRender(serverBundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      render = createRender(bundle, options)
    }
  )
}


async function serverRender (ctx) {
  const context = {
    title: 'Vue aaaa', // default title
    url: ctx.url
  }
  try{
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString(context, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }catch(e) {
    ctx.body = '404'
  }
}

router.get('*', async ctx => {
  if (isProd) {
    serverRender(ctx)
  } else {
    readyPromise.then(() => serverRender(ctx))
    // console.log(readyPromise)
    // await readyPromise()
    // serverRender(ctx)
  }
})

app.use(router.routes())
app.use(static(path.join(__dirname, 'dist')))


app.listen(3000)
