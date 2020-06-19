
const {Blog,User}=require('../db/model')
const {formatUser,formatBlog} =require('./_format')
const xss =require('xss')
async function createBlog({userId,content,image}){
 let res=  Blog.create({
    userId,
    content:xss(content),
    image
   })
   return res.dataValues
}


async function getBlogListByUser( { userName, pageIndex, pageSize }){
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    try{
      let res = await Blog.findAndCountAll({
          limit:2,
          offset:pageIndex * pageSize,
          order:[
           ['id','DESC']
          ],
          include:[
              {
                  model:User,
                  where:userWhereOpts,
                  attributes:['userName','nickName','picture','city']
              },
          ]
      })
    // 获取 dataValues
    let count =res.count
    let blogList = res.rows.map(row => row.dataValues)
    blogList.map(item=>{
      item.user=formatUser(item.user.dataValues)
      console.log(item.user)
      return item
    })
    return {
        count,
        blogList:formatBlog(blogList)
    }
    }catch(ex){
      console.log(ex)
    }
}


module.exports={
    createBlog,
    getBlogListByUser
}