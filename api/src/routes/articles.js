const express = require('express')
const bodyParser = require('body-parser')
const articlesService = require('../services/store/articles.service')
const commentsService = require('../services/store/comments.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await articlesService.getAllArticles())
  })
)

router.post(
  '/',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleBody, userId, articleImagePath, articleVisibilityStatusId } =
      req.body
    res.json(
      await articlesService.createArticle(
        articleBody,
        userId,
        articleImagePath,
        articleVisibilityStatusId
      )
    )
  })
)

router.get(
  '/:articleId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await articlesService.getArticleById(articleId))
  })
)

router.put(
  '/:articleId',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    const { articleBody, articleImagePath, articleVisibilityStatusId } =
      req.body
    res.json(
      await articlesService.updateArticleById(
        articleId,
        articleBody,
        articleImagePath,
        articleVisibilityStatusId
      )
    )
  })
)

router.delete(
  '/:articleId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await articlesService.deleteArticleById(articleId))
  })
)

router.get(
  '/:articleId/comments',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await commentsService.getAllCommentsForArticleById(articleId))
  })
)

router.post(
  '/:articleId/comments',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    const { userId, commentText, parentId } = req.body
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
  '/:articleId/comments/:commentId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, commentId } = req.params
    res.json(await commentsService.getCommentBy(commentId, articleId))
  })
)

router.put(
  '/:articleId/comments/:commentId',
  jsonParser,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, commentId } = req.params
    const { commentText } = req.body
    res.json(
      await commentsService.updateComment(commentId, commentText, articleId)
    )
  })
)

router.delete(
  '/:articleId/comments/:commentId',
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, commentId } = req.params
    res.json(await commentsService.deleteComment(commentId, articleId))
  })
)

module.exports = router
