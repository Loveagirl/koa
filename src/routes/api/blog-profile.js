const router = require('koa-router')()
const {loginCheck} =require('../../middlewares/loginChecks')
const {getProfileBlogList} = require('../../controller/blog-profile')
const {getBlogListStr} =require('../../utils/blog')
router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex',loginCheck, async (ctx,next)=>{
   let {userName,pageIndex} =  ctx.params
   pageIndex = parseInt(pageIndex)
   let res = await getProfileBlogList({userName,pageIndex})
   res.data.blogListTpl= await getBlogListStr(res.data)
   ctx.body=res
})



module.exports=router