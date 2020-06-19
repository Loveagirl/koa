
const {getBlogListByUser} =require('../service/blog')
const {SuccessModel} =require('../model/ResModel')
const {} = require('../cache/blog')
async function getSquareBlogList({pageIndex=0,pageSize=2}){
    console.log(pageIndex)
    let res =  await getBlogListByUser({pageIndex,pageSize}) 
    return new SuccessModel({
        count:res.count,
        blogList:res.blogList,
        pageIndex:pageIndex,
        pageSize:pageSize
    })
}

module.exports={
    getSquareBlogList 
}