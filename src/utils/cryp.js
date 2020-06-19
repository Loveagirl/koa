const crypto = require('crypto')
const key='SD123ui_sd$@'
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${key}`
    return _md5(str)
}

module.exports = doCrypto