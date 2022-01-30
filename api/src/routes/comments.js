const express = require('express')
const bodyParser = require('body-parser')
const commentsService = require('../services/store/comments.service')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  res.json(await commentsService.getAllComments())
})

router.post('/', jsonParser, async function (req, res) {
  const { articleId, userId, commentText, parentId } = req.body
  const result = await commentsService.createComment(
    articleId,
    userId,
    commentText,
    parentId
  )
  res.status(result.status).json(result.jsonPayload)
})

router.get('/:commentId', async function (req, res) {
  const { commentId } = req.params
  const result = await commentsService.getCommentBy(commentId)
  res.status(result.status).json(result.jsonPayload)
})

router.put('/:commentId', jsonParser, async function (req, res) {
  const { commentId } = req.params
  const { commentText } = req.body
  const result = await commentsService.updateComment(commentId, commentText)
  res.status(result.status).json(result.jsonPayload)
})

router.delete('/:commentId', async function (req, res) {
  const { commentId } = req.params
  const result = await commentsService.deleteComment(commentId)
  res.status(result.status).json(result.jsonPayload)
})

module.exports = router
