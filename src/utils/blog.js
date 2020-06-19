const fs = require('fs')
const path = require('path')
const ejs =require('ejs')



let tpl = fs.readFileSync(path.join(__dirname,'..','views','widgets','blog-list.ejs')).toString()

async function getBlogListStr(data){
    let res =await ejs.render(tpl,data)
    return res
}




module.exports ={
    getBlogListStr
}