const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../errors/error')

module.exports = {
  getAllComments: async () =>
    db(TABLES.COMMENTS).orderBy('date_edited', 'desc'),

  getAllCommentsForArticleById: async (articleId) => {
    if (!articleId) {
      throw new ErrorHandler('Article cannot be empty', {
        expose: true
      })
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
      throw new ErrorHandler('Article cannot be empty', {
        expose: true
      })
    }
    if (!userId) {
      throw new ErrorHandler('User cannot be empty', {
        expose: true
      })
    }
    if (!commentText) {
      throw new ErrorHandler('Comment text cannot be empty', {
        expose: true
      })
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
      throw new ErrorHandler('Comment text cannot be empty', {
        expose: true
      })
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
