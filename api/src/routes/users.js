const express = require('express')
const bodyParser = require('body-parser')
const usersService = require('../services/store/users.service')
const likesService = require('../services/store/likes.service')
const avatarsService = require('../services/store/avatars.service')
const { STATUS_CODES } = require('../services/store/constants')
const { s3Bucket, s3 } = require('../services/s3Config')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const { ErrorHandler } = require('../errors/error')
const { avatarUpload } = require('../services/store/imageUpload')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await usersService.getAllUsers())
  })
)

router.post(
  '/',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { name, email } = req.body
    res.json(await usersService.createUser(name, email))
  })
)

router.get(
  '/:id',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    res.json(await usersService.getUserById(id))
  })
)

router.put(
  '/:id',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const {
      name,
      nameVisibility,
      email,
      emailVisibility,
      phone,
      phoneVisibility,
      university,
      universityVisibility
    } = req.body
    res.json(
      await usersService.updateUserById(
        id,
        name,
        nameVisibility,
        email,
        emailVisibility,
        phone,
        phoneVisibility,
        university,
        universityVisibility
      )
    )
  })
)

router.delete(
  '/:id',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    res.json(await usersService.deleteUserById(id))
  })
)

router.get(
  '/:id/likes',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const { articleId } = req.query
    res.json(await likesService.getLikeByUserForArticle(id, articleId))
  })
)

router.post(
  '/:id/likes',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const { articleId } = req.body
    res.json(await likesService.createLike(id, articleId))
  })
)

router.delete(
  '/:id/likes',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const { articleId } = req.body
    res.json(await likesService.deleteLike(id, articleId))
  })
)

router.get(
  '/:id/avatar',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const avatars = await avatarsService.getUserAvatarById(id)
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
)

router.post(
  '/:id/avatar',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { id } = req.params
    const singleUpload = avatarUpload.single('avatar')
    singleUpload(req, res, async function (err) {
      if (err) {
        throw new ErrorHandler('Image upload error', {
          expose: true
        })
      }
      const { key } = req.file
      res.json(await avatarsService.createUserAvatar(id, key))
    })
  })
)

module.exports = router
