const express = require('express')
const bodyParser = require('body-parser')
const usersService = require('../services/store/users.service')
const likesService = require('../services/store/likes.service')

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

module.exports = router
