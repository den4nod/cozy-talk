const express = require('express')
const avatarsService = require('../services/store/avatars.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const { s3Bucket, s3 } = require('../services/s3Config')
const { ErrorHandler } = require('../errors/error')
const { STATUS_CODES } = require('../services/store/constants')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await avatarsService.getAllAvatars())
  })
)

router.get(
  '/:avatarId',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { avatarId } = req.params
    res.json(await avatarsService.getAvatarById(avatarId))
  })
)

router.get('/:avatarId/img', authMiddleware, async function (req, res, next) {
  const { avatarId } = req.params
  const avatars = await avatarsService.getAvatarById(avatarId)
  const params = { Bucket: s3Bucket, Key: avatars[0].avatar_path }
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

router.delete(
  '/:avatarId',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { avatarId } = req.params
    res.json(await avatarsService.deleteAvatarById(avatarId))
  })
)

module.exports = router
