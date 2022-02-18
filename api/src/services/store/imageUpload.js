const multer = require('multer')
const multerS3 = require('multer-s3')
const { s3, s3Bucket } = require('../s3Config')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { ErrorHandler } = require('../../error')

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(
      new ErrorHandler(
        'Invalid image format: only JPEG, JPG and PNG are allowed',
        {
          expose: true
        }
      ),
      false
    )
  }
}

const avatarUpload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    key: function (req, file, cb) {
      cb(null, 'avatars/' + uuidv4() + path.extname(file.originalname))
    }
  })
})

const articleImageUpload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    key: function (req, file, cb) {
      cb(null, 'articleImages/' + uuidv4() + path.extname(file.originalname))
    }
  })
})

module.exports = {
  avatarUpload,
  articleImageUpload
}
