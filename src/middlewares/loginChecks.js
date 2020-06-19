const {ErrorModel} =require('../model/ResModel')
const {loginCheckFailInfo} =require('../model/ErrorInfo')


 async function loginCheck(ctx,next){
      let userInfo = ctx.session.userInfo
      if(userInfo){
         await next()
         return
      }
      console.log(ctx.url)
      ctx.body = new ErrorModel(loginCheckFailInfo)
 }

 async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

 module.exports={
    loginCheck,
    loginRedirect
 }