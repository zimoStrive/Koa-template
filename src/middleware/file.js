const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

//上传头像中间件
const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_PATH)
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  }),
})
const handleAvatar = uploadAvatar.single('avatar')

//上传其他照片
//...

module.exports = {
  handleAvatar,
}
