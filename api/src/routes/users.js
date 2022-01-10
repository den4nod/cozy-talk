const express = require('express')
const db = require('../services/db')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

const USERS_TABLE = 'users'
const LIKED_ARTICLES_TABLE = 'liked_articles'
const SUCCESS_JSON_RESPONSE = { status: 'success' }
const BAD_REQUEST_STATUS_CODE = 400

const errorJsonResponse = (error) => {
  return { error: error }
}

router.get('/', async function (req, res) {
  res.json(await db(USERS_TABLE).orderBy('name'))
})

router.post('/', jsonParser, async function (req, res) {
  const { name, email, phone } = req.body
  if (!name) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Name cannot be empty'))
  }
  if (!email) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Email cannot be empty'))
  }
  if (!phone) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Phone cannot be empty'))
  }
  await db(USERS_TABLE)
    .insert({ name: name, email: email, phone: phone })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  res.json(await db(USERS_TABLE).where({ user_id: id }))
})

router.put('/:id', jsonParser, async function (req, res) {
  const { id } = req.params
  const { name, email, phone } = req.body
  if (!name) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Name cannot be empty'))
  }
  if (!email) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Email cannot be empty'))
  }
  if (!phone) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Phone cannot be empty'))
  }
  await db(USERS_TABLE)
    .where({ user_id: id })
    .update({ name: name, email: email, phone: phone })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  db(USERS_TABLE)
    .where({ user_id: id })
    .del()
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.get('/:id/likes', async function (req, res) {
  const { id } = req.params
  const { articleId } = req.query
  if (!articleId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Invalid article'))
  }
  res.json(
    await db(LIKED_ARTICLES_TABLE).where({ article_id: articleId, user_id: id })
  )
})

router.post('/:id/likes', jsonParser, async function (req, res) {
  const { id } = req.params
  const { articleId } = req.body
  if (!articleId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Invalid article'))
  }
  await db(LIKED_ARTICLES_TABLE)
    .insert({ article_id: articleId, user_id: id })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.delete('/:id/likes', jsonParser, function (req, res) {
  const { id } = req.params
  const { articleId } = req.body
  if (!articleId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Invalid article'))
  }
  db(LIKED_ARTICLES_TABLE)
    .where({ article_id: articleId, user_id: id })
    .del()
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

module.exports = router
