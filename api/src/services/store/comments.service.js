const db = require('../../services/db')
const {
  TABLES,
  errorJsonResponse,
  successJsonResponse,
  apiResponse,
  STATUS_CODES
} = require('./constants')

module.exports = {
  getAllComments: async () =>
    db(TABLES.COMMENTS).orderBy('date_edited', 'desc'),

  getAllCommentsForArticleById: async (articleId) => {
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Article cannot be empty')
      )
    }
    return db(TABLES.COMMENTS)
      .where({ article_id: articleId })
      .orderBy('date_edited', 'desc')
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Failed to return comments')
        )
      )
  },

  getCommentBy: async (commentId, articleId, userId) => {
    const whereFields = {
      comment_id: commentId,
      ...(articleId && { article_id: articleId }),
      ...(userId && { user_id: userId })
    }
    return db(TABLES.COMMENTS)
      .where(whereFields)
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Failed to return comment')
        )
      )
  },

  createComment: async (articleId, userId, commentText, parentId) => {
    const parentCommentId = parentId === undefined ? null : parentId
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Article cannot be empty')
      )
    }
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('User cannot be empty')
      )
    }
    if (!commentText) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Comment text cannot be empty')
      )
    }
    return db(TABLES.COMMENTS)
      .insert({
        article_id: articleId,
        user_id: userId,
        comment_text: commentText
      })
      .returning('comment_id')
      .then((id) => {
        db(TABLES.COMMENTS_TREEPATH)
          .insert({
            parent_comment_id: parentCommentId,
            child_comment_id: id[0]
          })
          .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
          .catch((error) =>
            apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
          )
      })
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
  },

  updateComment: async (commentId, commentText, articleId, userId) => {
    if (!commentText) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Comment text cannot be empty')
      )
    }
    const whereFields = {
      comment_id: commentId,
      ...(articleId && { article_id: articleId }),
      ...(userId && { user_id: userId })
    }
    return db(TABLES.COMMENTS)
      .where(whereFields)
      .update({ comment_text: commentText })
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
  },

  deleteComment: async (commentId, articleId, userId) => {
    const whereFields = {
      comment_id: commentId,
      ...(articleId && { article_id: articleId }),
      ...(userId && { user_id: userId })
    }
    return db(TABLES.COMMENTS)
      .where(whereFields)
      .del()
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
  }
}
