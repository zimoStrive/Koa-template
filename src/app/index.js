// 导入依赖模块
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const path = require('path')
const { koaSwagger } = require('koa2-swagger-ui')

// 导入中间件
const { responseHandler } = require('../middleware/response.js')
const globalApiPrefixMiddleware = require('../middleware/apiPrefix.js')
const { loggerMiddleware } = require('../middleware/logger.js')

// 导入路由和 Swagger 配置
const registerRouters = require('../router/index')
const swagger = require('./swagger.js')

// 创建 app
const app = new Koa()

// 使用 bodyparser 中间件
app.use(bodyParser())

// 配置静态资源目录 要放globalApiPrefixMiddleware中间件之前
app.use(koaStatic(path.join(process.cwd(), 'public/client')))

// 匹配api开头路径
app.use(globalApiPrefixMiddleware)

// Logger
app.use(loggerMiddleware)

// 配置 Swagger UI 中间件
app.use(swagger.routes(), swagger.allowedMethods())
app.use(
  koaSwagger({
    routePrefix: '/swagger', // 设置 Swagger UI 路由前缀
    swaggerOptions: {
      url: '/api/swagger.json', // Swagger 注解文件的路径 全局使用/api
    },
  }),
)

// 注册业务路由
registerRouters(app)

// 响应处理中间件
app.use(responseHandler)

// 导出 app
module.exports = app
