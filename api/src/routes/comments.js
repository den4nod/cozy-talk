const express = require('express')
const bodyParser = require('body-parser')
const commentsService = require('../services/store/comments.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await commentsService.getAllComments())
  })
)

router.post(
  '/',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const userId = req.auth.user_id
    const { articleId, commentText, parentId } = req.body
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
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    res.json(await commentsService.getCommentBy(commentId))
  })
)

router.put(
  '/:commentId',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    const { commentText } = req.body
    res.json(await commentsService.updateComment(commentId, commentText))
  })
)

router.delete(
  '/:commentId',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { commentId } = req.params
    res.json(await commentsService.deleteComment(commentId))
  })
)

module.exports = router
