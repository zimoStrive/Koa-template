const fs = require('fs')
const jwt = require('jsonwebtoken')
const fileService = require('../services/file')
const userService = require('../services/user')
const { UPLOAD_PATH } = require('../config/path')
const { PRIVATE_KEY } = require('../config/screct')

class UserController {
  async create(ctx, next) {
    // 获取用户传递过来的信息
    const user = ctx.request.body
    //将user信息存储到数据库
    const res = await userService.create(user)

    //查看存储的结果，通知前端成功
    ctx.body = {
      code: 200,
      msg: '注册成功~',
    }
    next()
  }

  async showAvatarImage(ctx, next) {
    // 1.获取用户的id
    const { userId } = ctx.params
    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }

  sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user
    // 2.颁发令牌token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 10000,
      algorithm: 'RS256',
    })
    // 3.返回用户信息
    ctx.body = { code: 200, msg: '登录成功~', data: { id, name, token } }
  }
}

module.exports = new UserController()
