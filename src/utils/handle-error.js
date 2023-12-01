const app = require('../app')
const { logger } = require('../middleware/logger')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let msg = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或者密码不能为空~'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      msg = '用户名已经被占用, 请输入新的用户名~'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      msg = '用户名不存在, 请检测用户名~'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      msg = '输入的密码错误, 请检测密码~'
      break
    case UNAUTHORIZATION:
      code = -1005
      msg = '无效的token或者token已经过期~'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      msg = '没有操作该资源的权限~'
      break
  }

  // 记录错误信息和状态码到日志

  logger.error(
    `Error occurred: ${msg}, 状态码: ${code}, 请求地址: ${ctx.url}, 请求方式: ${ctx.method}, 请求参数: ${JSON.stringify(
      ctx.request.body,
    )} ,参数类型: ${ctx.headers['content-type']}`,
  )
  // 保证返回状态是 200 不让浏览器报错
  ctx.status = 200

  ctx.body = { code, msg }
})
