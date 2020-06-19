/**
 * @description 时间相关的工具函数
 * @author Nick
 */



 const moment = require('moment')


 function timeFormat(str){
    let res =moment(new Date(str)).format('MM.dd HH:mm')
    return res
 }

 module.exports = {
    timeFormat
 }