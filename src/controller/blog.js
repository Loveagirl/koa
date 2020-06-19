
const {createBlog}=require('../service/blog')
const {SuccessModel,ErrorModel} =require('../model/ResModel')
const {createBlogFailInfo} =require('../model/ErrorInfo')
async function create({userId,content,image}){
    try{
      let res=  await createBlog({userId,content,image})
      return new SuccessModel(res)
    }catch(ex){
        console.log(ex)
        return new ErrorModel(createBlogFailInfo)
    }
    
}




module.exports={
    create,
    
}