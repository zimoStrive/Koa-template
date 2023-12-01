const KoaRouter = require('@koa/router')
const { create } = require('../controller/file')
const { handleAvatar } = require('../middleware/file')
const { verifyAuth } = require('../middleware/user')

const fileRouter = new KoaRouter({ prefix: '/file' })

/**
 * @swagger
 * /file/avatar:
 *   post:
 *     summary: "上传用户头像"
 *     description: 上传当前用户的头像
 *     tags: [文件模块]
 *     security:
 *       - JWTBearer: []  
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: avatar
 *         description: 用户头像文件
 *         in: formData
 *         required: true
 *         type: file
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 头像上传成功
 *       -1005:
 *         description: 未授权，需要登录
 *       500:
 *         description: 服务器错误
 */

fileRouter.post('/avatar', verifyAuth, handleAvatar, create)

module.exports = fileRouter
