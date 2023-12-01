/* 
  统一响应处理中间件 格式化响应数据
  {code:"状态码",msg:"消息",data:"数据"}
*/
const responseHandler = async (ctx, next) => {
  // 先执行下一个中间件
  await next()

  // 在设置响应
  if (ctx.body !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: ctx.body.code || 200,
      msg: ctx.body.msg || '请求成功~',
      data: ctx.body.data,
    }
  }
}

module.exports = {
  responseHandler
}
