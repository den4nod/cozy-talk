const db = require('../../services/db')
const { TABLES, STATUS_CODES } = require('./constants')
require('http-errors')
const { customExposedError } = require('../../error')

module.exports = {
  getAllArticles: async () =>
    db(TABLES.ARTICLES).orderBy('date_edited', 'desc'),

  getArticleById: async (articleId) =>
    db(TABLES.ARTICLES).where({ article_id: articleId }),

  createArticle: async (articleBody, userId) => {
    if (!articleBody) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Article body cannot be empty'
      )
    }
    if (!userId) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'User cannot be empty')
    }
    return db(TABLES.ARTICLES)
      .insert({ article_body: articleBody, user_id: userId })
      .then(() => {})
  },

  updateArticleById: async (articleId, articleBody) => {
    if (!articleBody) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Article body cannot be empty'
      )
    }
    return db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .update({ article_body: articleBody })
      .then(() => {})
  },

  deleteArticleById: async (articleId) =>
    db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .del()
      .then(() => {})
}
