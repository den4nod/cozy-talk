const express = require('express')
const bodyParser = require('body-parser')
const usersService = require('../services/store/users.service')
const likesService = require('../services/store/likes.service')
const avatarsService = require('../services/store/avatars.service')
const upload = require('../services/store/imageUpload')
const { STATUS_CODES } = require('../services/store/constants')
const { s3Bucket, s3 } = require('../services/s3Config')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  res.json(await usersService.getAllUsers())
})

router.post('/', jsonParser, async function (req, res) {
  const { name, email, phone } = req.body
  const result = await usersService.createUser(name, email, phone)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  const result = await usersService.getUserById(id)
  res.status(result.status).json(result.jsonPayload)
})

router.put('/:id', jsonParser, async function (req, res) {
  const { id } = req.params
  const { name, email, phone } = req.body
  const result = await usersService.updateUserById(id, name, email, phone)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/:id', async function (req, res) {
  const { id } = req.params
  const result = await usersService.deleteUserById(id)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:id/likes', async function (req, res) {
  const { id } = req.params
  const { articleId } = req.query
  const result = await likesService.getLikeByUserForArticle(id, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.post('/:id/likes', jsonParser, async function (req, res) {
  const { id } = req.params
  const { articleId } = req.body
  const result = await likesService.createLike(id, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/:id/likes', jsonParser, async function (req, res) {
  const { id } = req.params
  const { articleId } = req.body
  const result = await likesService.deleteLike(id, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:id/avatar', async function (req, res) {
  const { id } = req.params
  const result = await avatarsService.getUserAvatarById(id)
  if (result.status !== STATUS_CODES.SUCCESS) {
    return res.status(result).json(result.jsonPayload)
  }
  const params = { Bucket: s3Bucket, Key: result.jsonPayload[0].avatar_path }
  s3.getObject(params, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Failed to retrieve image',
          detail: err.message,
          error: err
        }
      })
    }
    res.writeHead(result.status, { 'Content-Type': 'image/jpeg' })
    res.write(data.Body, 'binary')
    res.end(null, 'binary')
  })
})

router.post('/:id/avatar', jsonParser, async function (req, res) {
  const { id } = req.params
  const singleUpload = upload.single('avatar')
  singleUpload(req, res, async function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Image upload error',
          detail: err.message,
          error: err
        }
      })
    }
    const { key } = req.file
    const result = await avatarsService.createUserAvatar(id, key)
    res.status(result.status).json(result.jsonPayload)
  })
})

module.exports = router
