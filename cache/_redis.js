

const redis = require('redis');
const {REDIS_CONFIG}  = require('../config/db')

const redisCreatClient = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.host);
redisCreatClient.on('error',err=>{
    console.error('redis error', err)
})


function set(key,value,timeout=60*60){
    if(typeof value == 'object'){
        JSON.stringify(value)
    }
    redisCreatClient.set(key,value);
    redisCreatClient.expire(key,timeout)
}

function get(key){
   return new Promise((resolve,reject)=>{
        redisCreatClient.get(key,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            if(data== null){
                resolve(data)
                return
            }
            try{
                resolve(JSON.parse(data))
            }catch(err){
                resolve(data)
            }
        })
    })
}

module.exports={
    set,
    get
}