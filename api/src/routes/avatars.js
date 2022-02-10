const express = require('express')
const avatarsService = require('../services/store/avatars.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')

const router = express.Router()

router.get(
  '/',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await avatarsService.getAllAvatars())
  })
)

router.get(
  '/:avatarId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { avatarId } = req.params
    res.json(await avatarsService.getAvatarById(avatarId))
  })
)

router.delete(
  '/:avatarId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { avatarId } = req.params
    res.json(await avatarsService.deleteAvatarById(avatarId))
  })
)

module.exports = router
