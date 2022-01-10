const express = require('express')
const db = require('../services/db')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

const ARTICLES_TABLE = 'articles'
const LIKED_ARTICLES_TABLE = 'liked_articles'
const COMMENTS_TABLE = 'comments'
const SUCCESS_JSON_RESPONSE = { status: 'success' }
const BAD_REQUEST_STATUS_CODE = 400

const errorJsonResponse = (error) => {
  return { error: error }
}

router.get('/', async function (req, res) {
  res.json(await db(ARTICLES_TABLE).orderBy('date_edited', 'desc'))
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
      .json(errorJsonResponse('User cannot be empty'))
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
  const { articleBody } = req.body
  if (!articleBody) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Article body cannot be empty'))
  }
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

router.get('/:articleId/likes', async function (req, res) {
  const { articleId } = req.params
  res.json(await db(LIKED_ARTICLES_TABLE).where({ article_id: articleId }))
})

router.get('/:articleId/comments', async function (req, res) {
  const { articleId } = req.params
  res.json(
    await db(COMMENTS_TABLE)
      .where({ article_id: articleId })
      .orderBy('date_edited', 'desc')
  )
})

router.post('/:articleId/comments', jsonParser, async function (req, res) {
  const { articleId } = req.params
  const { userId, commentText } = req.body
  if (!userId) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('User cannot be empty'))
  }
  if (!commentText) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Comment text cannot be empty'))
  }
  await db(COMMENTS_TABLE)
    .insert({
      article_id: articleId,
      user_id: userId,
      comment_text: commentText
    })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.get('/:articleId/comments/:commentId', async function (req, res) {
  const { articleId, commentId } = req.params
  res.json(
    await db(COMMENTS_TABLE).where({
      comment_id: commentId,
      article_id: articleId
    })
  )
})

router.put(
  '/:articleId/comments/:commentId',
  jsonParser,
  async function (req, res) {
    const { articleId, commentId } = req.params
    const { commentText } = req.body
    if (!commentText) {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse('Comment text cannot be empty'))
    }
    await db(COMMENTS_TABLE)
      .where({ comment_id: commentId, article_id: articleId })
      .update({ comment_text: commentText })
      .then(() => res.json(SUCCESS_JSON_RESPONSE))
      .catch((error) => {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .json(errorJsonResponse(error.name))
      })
  }
)

router.delete('/:articleId/comments/:commentId', function (req, res) {
  const { articleId, commentId } = req.params
  db(COMMENTS_TABLE)
    .where({ comment_id: commentId, article_id: articleId })
    .del()
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

module.exports = router
