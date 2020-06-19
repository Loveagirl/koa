
const User = require('../db/model/User')
const {formatUser} =require('./_format')
const doCrypto = require('../utils/cryp')


 async function getUserInfo(userName,password){
     const data = {
         userName
     }
     if(password){
         Object.assign(data,{password:doCrypto(password)})
     }
    let res= await User.findOne(
        {
            attributes:[
                'id','userName','nickName','gender','picture','city'
            ],
            where:data
        }
    )
    if(res){
        res= formatUser(res.dataValues)
    }
    
    return res
 }

 async function createUser({userName, password, gender, city,nickName}){
     await User.create({
        userName,
        password:doCrypto(password),
        nickName:nickName ? nickName :userName,
        gender,
        city
     })
 }

 async function updateUser({userName,nickName,city,picture}){
    let res = await User.update({
        nickName:nickName ? nickName :userName,
        city,
        picture  
     },
     {
       where:{
             userName
      }
     }
    )
    return res > 0
 }

 async function updateUserPassword(userName,password,newPassword){
     let res = await User.update({
         password:doCrypto(newPassword)
     },
     {
         where:{
             userName
         }
     }
     )
     return res > 0
 }

 module.exports={
    getUserInfo,
    createUser,
    updateUser,
    updateUserPassword
 }