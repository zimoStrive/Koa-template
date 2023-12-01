const router = require('@koa/router')() //引入路由函数
const path = require('path')

const swaggerJSDoc = require('swagger-jsdoc')
const { SERVER_HOST, SERVER_PORT } = require('../config/service')

const swaggerDefinition = {
  info: {
    title: '接口文档',
    version: '1.0.0',
    description: 'API',
  },
  host: `${SERVER_HOST}:${SERVER_PORT}`,
  // swagger 请求接口前缀
  basePath: '/api',
  // swagger 配置的安全验证 token
  securityDefinitions: {
    JWTBearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../router/*.js')], //配置路由router文件的位置
}

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = swaggerSpec
})

module.exports = router
