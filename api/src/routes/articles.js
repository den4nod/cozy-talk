const express = require('express')
const bodyParser = require('body-parser')
const articlesService = require('../services/store/articles.service')
const commentsService = require('../services/store/comments.service')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  res.json(await articlesService.getAllArticles())
})

router.post('/', jsonParser, async function (req, res) {
  const { articleBody, userId } = req.body
  const result = await articlesService.createArticle(articleBody, userId)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:articleId', async function (req, res) {
  const { articleId } = req.params
  const result = await articlesService.getArticleById(articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.put('/:articleId', jsonParser, async function (req, res) {
  const { articleId } = req.params
  const { articleBody } = req.body
  const result = await articlesService.updateArticleById(articleId, articleBody)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/:articleId', async function (req, res) {
  const { articleId } = req.params
  const result = await articlesService.deleteArticleById(articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:articleId/comments', async function (req, res) {
  const { articleId } = req.params
  const result = await commentsService.getAllCommentsForArticleById(articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.post('/:articleId/comments', jsonParser, async function (req, res) {
  const { articleId } = req.params
  const { userId, commentText, parentId } = req.body
  const result = await commentsService.createComment(
    articleId,
    userId,
    commentText,
    parentId
  )
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:articleId/comments/:commentId', async function (req, res) {
  const { articleId, commentId } = req.params
  const result = await commentsService.getCommentBy(commentId, articleId)
  res.status(result.status).json(result.jsonPayload)
})

router.put(
  '/:articleId/comments/:commentId',
  jsonParser,
  async function (req, res) {
    const { articleId, commentId } = req.params
    const { commentText } = req.body
    const result = await commentsService.updateComment(
      commentId,
      commentText,
      articleId
    )
    res.status(result.status).json(result.jsonPayload)
  }
)

router.delete('/:articleId/comments/:commentId', async function (req, res) {
  const { articleId, commentId } = req.params
  const result = await commentsService.deleteComment(commentId, articleId)
  res.status(result.status).json(result.jsonPayload)
})

module.exports = router
