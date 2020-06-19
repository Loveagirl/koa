const router = require('koa-router')()
const {uploadFile} =require('../../controller/utils')
router.prefix('/api/utils')

router.post('/upload',async(ctx,next)=>{
  
  ctx.body= await uploadFile(ctx)
})





module.exports =router