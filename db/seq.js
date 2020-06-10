const Sequelize = require('sequelize');
const {MYSQL_CONFIG} =require('../config/db')
const {isProd} =require('../utils/env')
let config ={
    host:MYSQL_CONFIG.host,
    dialect:'mysql'
}
  //线上环境
if(isProd){

  config.pool={
    max:5,
    min:0,
    idle:10000
  }  
}


const seq = new Sequelize(MYSQL_CONFIG.database,MYSQL_CONFIG.user,MYSQL_CONFIG.password,config)
module.exports=seq