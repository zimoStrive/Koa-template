const KoaRouter = require('@koa/router')
const { create, sign, showAvatarImage } = require('../controller/user')
const { verifyUser, handlePassword, verifyLogin } = require('../middleware/user')

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "用户注册"
 *     description: 用户注册
 *     tags: [用户模块]
 *     parameters:
 *       - name: name
 *         description: 账号
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 注册成功
 */
userRouter.post('/register', verifyUser, handlePassword, create)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "用户登录"
 *     description: 用户登录
 *     tags: [用户模块]
 *     parameters:
 *       - name: name
 *         description: 账号
 *         required: true
 *         in: formData
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 登录成功
 */
userRouter.post('/login', verifyLogin, sign)

/**
 * @swagger
 *  /users/avatar/{userId}:
 *   get:
 *     summary: "获取用户头像"
 *     description: 获取用户头像
 *     tags: [用户模块]
 *     parameters:
 *       - name: userId
 *         description: 用户ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 登录成功
 */
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter
