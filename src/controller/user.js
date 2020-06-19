const {getUserInfo,createUser,updateUser,updateUserPassword} =require('../service/user')

const {registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} =require('../model/ErrorInfo')
const {SuccessModel,ErrorModel} =require('../model/ResModel')
const user = require('../service/user')

async function isExist(userName){
  let res=  await getUserInfo(userName)
  if(res){
      return new SuccessModel(res)
  }
  return new ErrorModel(registerUserNameNotExistInfo)
}

async function register({userName, password, gender, city}){
  const res = await getUserInfo(userName)
  if(res){
    return new ErrorModel(registerUserNameExistInfo) 
  }
  try{
     await createUser({
        userName, password, gender, city
      })
      return new SuccessModel() 
  }catch(err){
     console.error('error',err)
  }
}

async function login(ctx,userName,password){
  const res = await getUserInfo(userName,password)
  if(res){
    console.log('成功')
     ctx.session.userInfo=res
     return new SuccessModel() 
  }
  console.log('失败')
  return new ErrorModel(loginFailInfo)
}

async function changeInfo({ctx,nickName,city,picture}){
   const {userName} = ctx.session.userInfo  
   let res = await updateUser({userName,nickName,city,picture})
   if(res){
     Object.assign(ctx.session.userInfo,{
       nickName,city,picture
     })
     return new SuccessModel()
   }
   return new ErrorModel(changeInfoFailInfo)
}

async function changePassword(userName,password,newPassword){
    let res = await updateUserPassword(userName,password,newPassword)
    if(res){
       return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

async function logOut(ctx){
   delete ctx.session.userInfo
   return new SuccessModel()
}

module.exports={
    isExist,
    register,
    login,
    changeInfo  ,
    changePassword,
    logOut
}