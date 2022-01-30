const express = require('express')
const avatarsService = require('../services/store/avatars.service')

const router = express.Router()

router.get('/', async function (req, res) {
  res.json(await avatarsService.getAllAvatars())
})

router.get('/:avatarId', async function (req, res) {
  const { avatarId } = req.params
  const result = await avatarsService.getAvatarById(avatarId)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/:avatarId', async function (req, res) {
  const { avatarId } = req.params
  const result = await avatarsService.deleteAvatarById(avatarId)
  res.status(result.status).json(result.jsonPayload)
})

module.exports = router
