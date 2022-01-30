const express = require('express')
const bodyParser = require('body-parser')
const likesService = require('../services/store/likes.service')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  res.json(await likesService.getAllLikes())
})

router.get('/', async function (req, res) {
  const { articleId } = req.query
  const result = await likesService.getAllLikesForArticle(articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/', async function (req, res) {
  const { userId } = req.query
  const result = await likesService.getAllLikesByUser(userId)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/', async function (req, res) {
  const { userId, articleId } = req.query
  const result = await likesService.getLikeByUserForArticle(userId, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.post('/', jsonParser, async function (req, res) {
  const { userId, articleId } = req.query
  const result = await likesService.createLike(userId, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/', async function (req, res) {
  const { userId, articleId } = req.query
  const result = await likesService.deleteLike(userId, articleId)
  res.status(result.status).json(result.jsonPayload)
})

module.exports = router
