const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const router = new require('koa-router')()
const static = require('koa-static')
const convert = require('koa-convert')

// 获取 Markdown
function getMarkdown (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = function (filePath) {
  const app = new Koa()
  const staticPath = '.'

  app.use(static(
    path.join(__dirname, staticPath)
  ))

  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackMiddleware = require("koa-webpack-dev-middleware")
    const webpackConfig = require('./webpack.config')
    app.use(convert(webpackMiddleware(webpack(webpackConfig), {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })))
  }

  router.get('/md', async (ctx) => {
    ctx.body = await getMarkdown(filePath)
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(1024)

  console.log('starting at port 1024')
  require('opn')('http://localhost:1024')
}
