const crypto = require('crypto')

function shaPassword(password) {
  const sha = crypto.createHash('sha3-256') // 使用 SHA3-256 算法
  return sha.update(password).digest('hex')
}

module.exports = shaPassword
