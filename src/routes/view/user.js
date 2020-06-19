const router = require('koa-router')()
const {loginRedirect} =require('../../middlewares/loginChecks')

router.get('/login', async (ctx,next)=>{
    let userInfo = ctx.session.userInfo
    let isLogin =false
    if(userInfo){
       isLogin=true
    }
    await ctx.render('login',{
       isLogin
    })
})

router.get('/register', async(ctx,next)=>{
    let userInfo = ctx.session.userInfo
    let isLogin =false
    if(userInfo){
       isLogin=true
    }
    await ctx.render('register',{
        isLogin 
    })
})

router.get('/setting', loginRedirect, async(ctx,next)=>{
     await ctx.render('setting',ctx.session.userInfo)
})


module.exports=router