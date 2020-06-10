/**
 *  @description 存储配置
 *  @author Nick 
 */

const {isProd} =require('../utils/env')

let REDIS_CONFIG ={
    port:6379,
    host:'127.0.0.1'
}

let MYSQL_CONFIG={
    database:'koa2_weibo',
    user:'root',
    password:'pass',
    host:'localhost',
    dialect:'mysql'
}
//线上环境
if(isProd){
    REDIS_CONFIG ={
        port:6379,
        host:'127.0.0.1'
    }
    MYSQL_CONFIG={
        database:'koa2_weibo',
        user:'root',
        password:'pass',
        host:'localhost',
        dialect:'mysql'
    }
}
module.exports={
    REDIS_CONFIG,
    MYSQL_CONFIG
}