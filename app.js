const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONFIG} = require('./config/db')
const {isProd} =require('./utils/env')
// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorView = require('./routes/view/error')

// error handler
let errorConfig={

}
if(isProd){
  errorConfig={
    redirect:'/error'
  }
}

onerror(app,errorConfig)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.keys=['key']
app.use(session({
    cookie:{
       path: '/',
       httpOnly: true,
       maxAge: 24 * 60 * 60 * 1000 ,//one day in ms,
    },
    store: redisStore({
      all:`${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
    })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorView.routes(),errorView.allowedMethods()) //404路由注册到最下面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
