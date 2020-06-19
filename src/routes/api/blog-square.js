const router = require('koa-router')()
const {getSquareBlogList} =require('../../controller/blog-square')
const {getBlogListStr} =require('../../utils/blog')
router.prefix('/api/square')
router.get('/loadMore/:pageIndex',async(ctx,next)=>{
    let {pageIndex} =ctx.params
    pageIndex = parseInt(pageIndex)
    let res = await getSquareBlogList({pageIndex})
    res.data.blogListTpl= await getBlogListStr(res.data)
    ctx.body=res
})



module.exports = router