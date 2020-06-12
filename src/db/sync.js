const seq= require('./seq')
require('./model/index')
!(async ()=>{
    try{
        await seq.authenticate();
        console.log('ok')
    }catch(error){
        console.log('error'+error)
    }
})()

seq.sync({force:true}).then(()=>{
    console.log(' sync ok')
    process.exit();
})