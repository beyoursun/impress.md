const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const router = new require('koa-router')()
const static = require('koa-static')
const convert = require('koa-convert')
const webpack = require('webpack')
const webpackMiddleware = require("koa-webpack-dev-middleware")
const webpackConfig = require('./webpack.config')

const app = new Koa()

const staticPath = '.'

app.use(static(
  path.join(__dirname, staticPath)
))

app.use(convert(webpackMiddleware(webpack(webpackConfig), {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  index: 'index.html'
})))

// function renderIndex() {
//   return new Promise((resolve, reject) => {
//     fs.readFile('./index.html', 'binary', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }

// router.get('/', async (ctx) => {
//   ctx.body = await renderIndex()
// })

// app
//   .use(router.routes())
//   .use(router.allowedMethods())

app.listen(3000)

console.log('starting at port 3000')
