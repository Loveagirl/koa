const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log("11111111111111")
  var session = ctx.session;
  console.log(session)
  console.log('222222222222')
  if(session.viewCount == null){
    console.log('1')
    session.viewCount = 0
    console.log(session)
  }
    session.viewCount++
   console.log(session.viewCount)
   ctx.body = {
     title:'koa2 session',
     session:session.viewCount
   }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log(ctx.cookies)
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
