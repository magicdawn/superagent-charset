'use strict'

const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  const {
    request,
    response,
  } = ctx

  ctx.body = '<meta charset="bad-charset">'
  ctx.set('content-type', 'text/plain')
})

module.exports = app