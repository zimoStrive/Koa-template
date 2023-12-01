const jwt = require('jsonwebtoken')
const userService = require('../services/user')
const shaPassword = require('../utils/sha3-password')
const { PUBLIC_KEY } = require('../config/screct')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require('../config/error')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== shaPassword(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 4.将user对象保存在ctx
  ctx.user = user

  // 执行next, 下一个中间件
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization

  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 2.验证token是否是有效
  try {
    // 2.1.获取token中信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })

    // 2.将token的信息保留下来
    ctx.user = result

    // 3.执行下一个中间件
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

const verifyUser = async (ctx, next) => {
  // 1.验证用户名和密码是否为空
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }

  // 3.执行下一个中间件
  await next()
}

const handlePassword = async (ctx, next) => {
  //取出密码
  const { password } = ctx.request.body
  //加密密码
  ctx.request.body.password = shaPassword(password)
  //执行下一个
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyLogin,
  verifyAuth,
}
