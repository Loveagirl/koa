/**
 * @description 博客数据模型
 * @author Nick
 * 
 * 
*/


const seq = require('../seq')
const {User} =require('./index')
const {INTEGER,STRING,TEXT} =require('../types') 

const Blog =seq.define('blog',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户 ID'
    },
    content:{
        type:TEXT,
        allowNull:false,
        comment:'微博内容'
    },
    image:{
        type:STRING,
        comment:'图片'
    }
})

module.exports=Blog