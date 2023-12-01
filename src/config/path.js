const path = require('path')

// 上传路径
const UPLOAD_PATH = './public/server/avatars'
// 日志写入路径
const LogPath = path.resolve(__dirname, '../logs/requestError.log')

module.exports = {
  UPLOAD_PATH,
  LogPath,
}
