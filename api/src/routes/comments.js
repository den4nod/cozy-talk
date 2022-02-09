const express = require('express')
const bodyParser = require('body-parser')
const commentsService = require('../services/store/comments.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await commentsService.getAllComments())
  })
)

router.post(
  '/',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, userId, commentText, parentId } = req.body
    res.json(
      await commentsService.createComment(
        articleId,
        userId,
        commentText,
        parentId
      )
    )
  })
)

router.get(
  '/:commentId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    res.json(await commentsService.getCommentBy(commentId))
  })
)

router.put(
  '/:commentId',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    const { commentText } = req.body
    res.json(await commentsService.updateComment(commentId, commentText))
  })
)

router.delete(
  '/:commentId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    res.json(await commentsService.deleteComment(commentId))
  })
)

module.exports = router
