

const {ErrorModel} =require('../model/ResModel')
const {jsonSchemaFileInfo} =require('../model/ErrorInfo')

function middlewares(fn){
    return async (ctx,next)=>{
      let res =await fn(ctx.request.body)
      if(res){
         ctx.body=await new ErrorModel(jsonSchemaFileInfo)
         return
      }
      await next()
    }
}

module.exports=middlewares