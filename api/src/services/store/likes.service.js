const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../error')

module.exports = {
  getAllLikes: async () =>
    db(TABLES.LIKED_ARTICLES).orderBy('date_edited', 'desc'),

  getAllLikesForArticle: async (articleId) => {
    if (!articleId) {
      throw new ErrorHandler('Invalid article', {
        expose: true
      })
    }
    return db(TABLES.LIKED_ARTICLES).where({ article_id: articleId })
  },

  getAllLikesByUser: async (userId) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    return db(TABLES.LIKED_ARTICLES).where({ article_id: userId })
  },

  getLikeByUserForArticle: async (userId, articleId) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    if (!articleId) {
      throw new ErrorHandler('Invalid article', {
        expose: true
      })
    }
    return db(TABLES.LIKED_ARTICLES).where({
      user_id: userId,
      article_id: articleId
    })
  },

  createLike: async (userId, articleId) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    if (!articleId) {
      throw new ErrorHandler('Invalid article', {
        expose: true
      })
    }
    return db(TABLES.LIKED_ARTICLES)
      .insert({ user_id: userId, article_id: articleId })
      .then(() => {})
  },

  deleteLike: async (userId, articleId) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    if (!articleId) {
      throw new ErrorHandler('Invalid article', {
        expose: true
      })
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({ user_id: userId, article_id: articleId })
      .del()
      .then(() => {})
  }
}
