

const path = require('path')
const fse= require('fs-extra')
const {SuccessModel} =require('../model/ResModel')
//存储目录
const DIST_FOLDER_PATH=path.join(__dirname,'..','..','uploadFiles') 


fse.pathExists(DIST_FOLDER_PATH).then((exist)=>{
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})


async function uploadFile(ctx){
    
    let file=ctx.request.files.file
    let fileName = Date.now()+'.'+file.name 
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) 

    await fse.move(file.path,distFilePath)
    let res= new SuccessModel({
        url: '/' + fileName
    })
    return res
}

module.exports={
    uploadFile
}