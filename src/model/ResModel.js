/**
 * @description 成功或者失败相应
 * @author Nick
 * 
*/



class BaseModel{
    constructor({errno,data,message}){
      this.errno=errno
      if(data){
          this.data=data
      }
      if(message){
          this.message=message
      }
    }
}


class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}