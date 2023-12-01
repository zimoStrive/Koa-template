//导入app
const app = require('./app')
const { SERVER_PORT, SERVER_HOST } = require('./config/service')
require('./utils/handle-error')
//启动app
app.listen(SERVER_PORT, () => {
  console.log('服务器启动成功~~', `${SERVER_HOST}:${SERVER_PORT}`)
})
