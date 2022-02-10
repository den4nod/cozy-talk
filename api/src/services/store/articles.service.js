const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../error')

module.exports = {
  getAllArticles: async () =>
    db(TABLES.ARTICLES).orderBy('date_edited', 'desc'),

  getArticleById: async (articleId) =>
    db(TABLES.ARTICLES).where({ article_id: articleId }),

  createArticle: async (articleBody, userId) => {
    if (!articleBody) {
      throw new ErrorHandler('Article body cannot be empty', {
        expose: true
      })
    }
    if (!userId) {
      throw new ErrorHandler('User cannot be empty', {
        expose: true
      })
    }
    return db(TABLES.ARTICLES)
      .insert({ article_body: articleBody, user_id: userId })
      .then(() => {})
  },

  updateArticleById: async (articleId, articleBody) => {
    if (!articleBody) {
      throw new ErrorHandler('Article body cannot be empty', {
        expose: true
      })
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
