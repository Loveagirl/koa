const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const path = require('path')
// const bodyparser = require('koa-bodyparser')
const koaBody=require('koa-body')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONFIG} = require('./config/db')
const viewServe = require('koa-static')
const {isProd} =require('./utils/env')
// 路由
const homeView = require('./routes/view/blog-home')
const viewUser = require('./routes/view/user')
const apiUser = require('./routes/api/user')
const apiProfile = require('./routes/api/blog-profile')
const apiSquare = require('./routes/api/blog-square')
const apiBlog = require('./routes/api/blog')
const errorView = require('./routes/view/error')

const uploadFileRouter =require('./routes/api/utils')

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
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart:true,
  formidable:{
    maxFieldsSize:1024 *1024 *1024,
    keepExtensions: true,
  }
}))
app.use(json())
app.use(logger())
app.use(viewServe(__dirname + '/public'))
app.use(viewServe(path.join(__dirname,'..','uploadFiles')))
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
    key:'weibo.sid',
    prefix:'weibo:sess:',
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
app.use(homeView.routes(),homeView.allowedMethods())
app.use(viewUser.routes(), viewUser.allowedMethods())
//api
app.use(apiUser.routes(),apiUser.allowedMethods())
app.use(apiBlog.routes(),apiBlog.allowedMethods())
app.use(apiProfile.routes(),apiProfile.allowedMethods())
app.use(apiSquare.routes(),apiSquare.allowedMethods())
app.use(uploadFileRouter.routes(),uploadFileRouter.allowedMethods())
app.use(errorView.routes(),errorView.allowedMethods()) //404路由注册到最下面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
