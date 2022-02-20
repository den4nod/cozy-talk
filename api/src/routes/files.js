const express = require('express')
const { s3Bucket, s3 } = require('../services/s3Config')
const { ErrorHandler } = require('../errors/error')
const { STATUS_CODES } = require('../services/store/constants')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, function (req, res, next) {
  const { img } = req.query
  const params = { Bucket: s3Bucket, Key: img }
  s3.getObject(params, (err, data) => {
    if (err) {
      throw new ErrorHandler('Failed to retrieve image', {
        expose: true
      })
    }
    res.writeHead(STATUS_CODES.SUCCESS, { 'Content-Type': 'image/jpeg' })
    res.write(data.Body, 'binary')
    res.end(null, 'binary')
  })
})

module.exports = router
