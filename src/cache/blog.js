
const {set, get} =require('./_redis')



async function getSquareCache(pageIndex){
    const WEI_BO='weibo:'
    let key=`${WEI_BO}:${pageIndex}`
    let res = get(key)
    if(res){
        return res
    }
    set(key,)
}


module.exports={
    getSquareCache
}