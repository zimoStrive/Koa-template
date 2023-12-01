async function globalApiPrefixMiddleware(ctx, next) {
  // 检查路径是否以 '/api' 开头
  if (!ctx.request.path.startsWith('/api')) {
    // 如果不是以 '/api' 开头，则返回 404
    ctx.status = 404
    ctx.body = 'Not Found'
    return
  }

  // 移除 '/api' 前缀
  ctx.request.path = ctx.request.path.replace(/^\/api/, '')

  // 继续处理下一个中间件
  await next()
}

module.exports = globalApiPrefixMiddleware
