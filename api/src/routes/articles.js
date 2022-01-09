const express = require('express')
const db = require('../services/db')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

const ARTICLES_TABLE = 'articles'
const SUCCESS_JSON_RESPONSE = { status: 'success' }
const BAD_REQUEST_STATUS_CODE = 400

const errorJsonResponse = (error) => {
  return { error: error }
}

router.get('/', async function (req, res) {
  res.json(await db(ARTICLES_TABLE).orderBy('article_id'))
})

router.post('/', jsonParser, async function (req, res) {
  const { articleBody, userId } = req.body
  if (!articleBody) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Article body cannot be empty'))
  }
  if (!userId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('User ID cannot be empty'))
  }

  await db(ARTICLES_TABLE)
    .insert({ article_body: articleBody, user_id: userId })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.get('/:articleId', async function (req, res) {
  const { articleId } = req.params
  res.json(await db(ARTICLES_TABLE).where({ article_id: articleId }))
})

router.put('/:articleId', jsonParser, async function (req, res) {
  const { articleId } = req.params
  if (!articleId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Article ID cannot be empty'))
  }
  const { articleBody } = req.body
  await db(ARTICLES_TABLE)
    .where({ article_id: articleId })
    .update({ article_body: articleBody })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.delete('/:articleId', function (req, res) {
  const { articleId } = req.params
  if (!articleId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Article ID cannot be empty'))
  }
  db(ARTICLES_TABLE)
    .where({ article_id: articleId })
    .del()
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

module.exports = router
