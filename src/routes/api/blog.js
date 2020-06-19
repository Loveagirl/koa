


const {loginCheck}=require('../../middlewares/loginChecks')
const {create} =require('../../controller/blog')
const router =require('koa-router')()
router.prefix('/api/blog')

router.post('/create',loginCheck,async(ctx,next)=>{
    console.log(ctx.session.userInfo)
    const {id:userId} =ctx.session.userInfo
    const {content,image} = ctx.request.body;
    ctx.body=await create({userId,content,image})
})





module.exports = router