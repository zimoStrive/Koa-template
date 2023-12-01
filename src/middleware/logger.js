const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const { LogPath } = require('../config/path')

// 获取日志文件的目录
const logsDir = path.parse(LogPath).dir

// 如果日志目录不存在，创建日志目录
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// 配置log4.js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: LogPath,
      pattern: '-yyyy-MM-dd',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'error', // 默认日志级别为 'error' | debug
    },
  },
})

// 获取名为 '[Default]' 的 logger 实例
const logger = log4js.getLogger('[Default]')

// logger中间件
const loggerMiddleware = async (ctx, next) => {
  // 记录请求开始时间
  const start = +new Date()
  await next() // 继续处理请求
  // 记录请求结束时间
  const ms = +new Date() - start

  // 获取请求来源的IP地址
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips

  // 构造日志文本
  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(
    ctx.request.body,
  )}  响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms ,请求地址: ${ctx.url}, 请求方式: ${
    ctx.method
  }, 请求参数: ${JSON.stringify(ctx.request.body)} ,参数类型: ${ctx.headers['content-type']} `

  // 使用 logger 记录日志信息
  logger.info(logText)
}

module.exports = {
  logger,
  loggerMiddleware,
}
