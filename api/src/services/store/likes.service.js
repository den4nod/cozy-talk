const db = require('../../services/db')
const { TABLES, STATUS_CODES } = require('./constants')
const { customExposedError } = require('../../error')

module.exports = {
  getAllLikes: async () =>
    db(TABLES.LIKED_ARTICLES).orderBy('date_edited', 'desc'),

  getAllLikesForArticle: async (articleId) => {
    if (!articleId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid article')
    }
    return db(TABLES.LIKED_ARTICLES).where({ article_id: articleId })
  },

  getAllLikesByUser: async (userId) => {
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid user')
    }
    return db(TABLES.LIKED_ARTICLES).where({ article_id: userId })
  },

  getLikeByUserForArticle: async (userId, articleId) => {
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid user')
    }
    if (!articleId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid article')
    }
    return db(TABLES.LIKED_ARTICLES).where({
      user_id: userId,
      article_id: articleId
    })
  },

  createLike: async (userId, articleId) => {
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid user')
    }
    if (!articleId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid article')
    }
    return db(TABLES.LIKED_ARTICLES)
      .insert({ user_id: userId, article_id: articleId })
      .then(() => {})
  },

  deleteLike: async (userId, articleId) => {
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid user')
    }
    if (!articleId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Invalid article')
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({ user_id: userId, article_id: articleId })
      .del()
      .then(() => {})
  }
}
