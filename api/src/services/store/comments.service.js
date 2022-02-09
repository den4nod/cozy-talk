const db = require('../../services/db')
const { TABLES, STATUS_CODES } = require('./constants')
const { customExposedError } = require('../../error')

module.exports = {
  getAllComments: async () =>
    db(TABLES.COMMENTS).orderBy('date_edited', 'desc'),

  getAllCommentsForArticleById: async (articleId) => {
    if (!articleId) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Article cannot be empty'
      )
    }
    return db(TABLES.COMMENTS)
      .where({ article_id: articleId })
      .orderBy('date_edited', 'desc')
  },

  getCommentBy: async (commentId, articleId, userId) => {
    const whereFields = {
      comment_id: commentId,
      ...(articleId && { article_id: articleId }),
      ...(userId && { user_id: userId })
    }
    return db(TABLES.COMMENTS).where(whereFields)
  },

  createComment: async (articleId, userId, commentText, parentId) => {
    const parentCommentId = parentId === undefined ? null : parentId
    if (!articleId) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Article cannot be empty'
      )
    }
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'User cannot be empty')
    }
    if (!commentText) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Comment text cannot be empty'
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
          .then(() => {})
      })
  },

  updateComment: async (commentId, commentText, articleId, userId) => {
    if (!commentText) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Comment text cannot be empty'
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
      .then(() => {})
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
      .then(() => {})
  }
}
