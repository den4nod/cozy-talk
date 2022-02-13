const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../error')

module.exports = {
  getAllArticles: async () =>
    db(TABLES.ARTICLES).orderBy('date_edited', 'desc'),

  getArticleById: async (articleId) =>
    db(TABLES.ARTICLES).where({ article_id: articleId }),

  createArticle: async (
    articleBody,
    userId,
    articleImagePath,
    articleVisibilityStatusId
  ) => {
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
      .insert({
        article_body: articleBody,
        user_id: userId,
        article_image_path: articleImagePath || '',
        article_visibility_status_id: articleVisibilityStatusId
      })
      .then(() => {})
  },

  updateArticleById: async (
    articleId,
    articleBody,
    articleImagePath,
    articleVisibilityStatusId
  ) => {
    if (!articleBody && !articleImagePath && !articleVisibilityStatusId) {
      throw new ErrorHandler('Nothing to update', {
        expose: true
      })
    }
    const updateFields = {
      ...(articleBody && { article_body: articleBody }),
      ...(articleImagePath && { article_image_path: articleImagePath }),
      ...(articleVisibilityStatusId && {
        article_visibility_status_id: articleVisibilityStatusId
      })
    }
    return db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .update(updateFields)
      .then(() => {})
  },

  deleteArticleById: async (articleId) =>
    db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .del()
      .then(() => {})
}
