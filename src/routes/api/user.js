const router = require('koa-router')()
const {isExist, register , login,changeInfo,changePassword,logOut} =require('../../controller/user')
const middlewares =require('../../middlewares/validator')
const validate =require('../../validator/user')
const {loginCheck} =require('../../middlewares/loginChecks')
const { changeInfoFailInfo, changePasswordFailInfo } = require('../../model/ErrorInfo')
router.prefix('/api/user')

router.post('/isExist', async(ctx,next)=>{
    const {userName} = ctx.request.body
    ctx.body=await isExist(userName) 
})

router.post('/register',middlewares(validate), async(ctx,next)=>{
    const {userName, password, gender, city} = ctx.request.body;
     await register({userName, password, gender, city})
})

router.post('/login', async (ctx,next)=>{
    const {userName,password} = ctx.request.body
    ctx.body=  await login(ctx,userName,password)
   
})

router.patch('/changeInfo',loginCheck, async (ctx,next)=>{
    const { nickName,city,picture} =ctx.request.body
    ctx.body= await changeInfo({ctx,nickName,city,picture})
})

router.patch('/changePassword',loginCheck, async (ctx,next)=>{
     const {userName}= ctx.session.userInfo
     const {password,newPassword} =ctx.request.body
     ctx.body=await changePassword(userName,password,newPassword)
})

router.post('/logout', loginCheck , async(ctx,next)=>{
       ctx.body=await logOut(ctx)
})


module.exports=router