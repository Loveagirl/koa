
const {getBlogListByUser} =require('../service/blog')
const {SuccessModel} =require('../model/ResModel')
async function getProfileBlogList({userName,pageIndex=0,pageSize=2}){
    let res =  await getBlogListByUser({userName,pageIndex,pageSize}) 
    
    return new SuccessModel({
        count:res.count,
        blogList:res.blogList,
        pageIndex:pageIndex,
        pageSize:pageSize
    })
}



module.exports={
    getProfileBlogList
}