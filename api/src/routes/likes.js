const express = require('express')
const bodyParser = require('body-parser')
const likesService = require('../services/store/likes.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await likesService.getAllLikes())
  })
)

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.query
    res.json(await likesService.getAllLikesForArticle(articleId))
  })
)

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { userId } = req.query
    res.json(await likesService.getAllLikesByUser(userId))
  })
)

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { userId, articleId } = req.query
    res.json(await likesService.getLikeByUserForArticle(userId, articleId))
  })
)

router.post(
  '/',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { userId, articleId } = req.query
    res.json(await likesService.createLike(userId, articleId))
  })
)

router.delete(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { userId, articleId } = req.query
    res.json(await likesService.deleteLike(userId, articleId))
  })
)

module.exports = router
