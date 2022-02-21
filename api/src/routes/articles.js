const express = require('express')
const bodyParser = require('body-parser')
const articlesService = require('../services/store/articles.service')
const commentsService = require('../services/store/comments.service')
const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const { articleImageUpload } = require('../services/store/imageUpload')
const { ErrorHandler } = require('../errors/error')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    res.json(await articlesService.getAllArticles())
  })
)

router.post(
  '/',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const userId = req.auth.user_id
    const { articleBody, articleImagePath, articleVisibilityStatusId } =
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

router.post(
  '/form',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const singleUpload = articleImageUpload.single('articleImage')
    singleUpload(req, res, async function (err) {
      if (err) {
        throw new ErrorHandler('Image upload error', {
          expose: true
        })
      }
      const userId = req.auth.user_id
      const { articleBody, articleVisibilityStatusId } = req.body
      const { key } = req.file

      res.json(
        await articlesService.createArticle(
          articleBody,
          userId,
          key,
          articleVisibilityStatusId
        )
      )
    })
  })
)

router.put(
  '/form/:articleId',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    const singleUpload = articleImageUpload.single('articleImage')
    singleUpload(req, res, async function (err) {
      if (err) {
        throw new ErrorHandler('Image upload error', {
          expose: true
        })
      }
      const userId = req.auth.user_id
      const { articleBody, articleVisibilityStatusId } = req.body
      const { key } = req.file

      res.json(
        await articlesService.updateArticleById(
          articleId,
          articleBody,
          userId,
          key,
          articleVisibilityStatusId
        )
      )
    })
  })
)

router.get(
  '/:articleId',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await articlesService.getArticleById(articleId))
  })
)

router.put(
  '/:articleId',
  jsonParser,
  authMiddleware,
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
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await articlesService.deleteArticleById(articleId))
  })
)

router.get(
  '/:articleId/comments',
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    res.json(await commentsService.getAllCommentsForArticleById(articleId))
  })
)

router.post(
  '/:articleId/comments',
  jsonParser,
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId } = req.params
    const userId = req.auth.user_id
    const { commentText, parentId } = req.body
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
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, commentId } = req.params
    res.json(await commentsService.getCommentBy(commentId, articleId))
  })
)

router.put(
  '/:articleId/comments/:commentId',
  jsonParser,
  authMiddleware,
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
  authMiddleware,
  asyncErrorHandlingMiddleware(async function (req, res, next) {
    const { articleId, commentId } = req.params
    res.json(await commentsService.deleteComment(commentId, articleId))
  })
)

module.exports = router
