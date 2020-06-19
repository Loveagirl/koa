


const router =require('koa-router')()
const {loginRedirect, loginCheck} =require('../../middlewares/loginChecks')
const {getProfileBlogList} =require('../../controller/blog-profile')
const {getSquareBlogList} = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')

//主页

router.get('/', async(ctx,next)=>{
    await ctx.render('index',{})
} )


//个人页面
router.get('/profile',loginRedirect, async(ctx,next)=>{
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName',loginCheck, async(ctx,next)=>{
      const { userName:curUserName } = ctx.params
      const myUserInfo = ctx.session.userInfo
      let curUserInfo
      const isMe = myUserInfo.userName === curUserName
      if(isMe){
        curUserInfo = myUserInfo 
      }else{
           // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
      }
      let res= await getProfileBlogList({userName:curUserName})
     await ctx.render('profile',{
        blogData:{
            isEmpty:res.data.count===0 ? true : false,
            pageSize:res.data.pageSize,
            pageIndex:res.data.pageIndex,
            count:res.data.count,
            blogList:res.data.blogList
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
        }
     })
})


//广场页
router.get('/square', async(ctx,next)=>{
    console.log('in this  1111111111111')
   let res = await getSquareBlogList({})
   console.log(res)
   await ctx.render('square',{
    blogData:{
        isEmpty:res.data.count===0 ? true : false,
        pageSize:res.data.pageSize,
        pageIndex:res.data.pageIndex,
        count:res.data.count,
        blogList:res.data.blogList
    }
   })
})


module.exports=router