const db = require('../../services/db')
const {
  TABLES,
  errorJsonResponse,
  successJsonResponse,
  apiResponse,
  STATUS_CODES
} = require('./constants')

module.exports = {
  getAllArticles: async () =>
    db(TABLES.ARTICLES).orderBy('date_edited', 'desc'),

  getArticleById: async (articleId) =>
    db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Article does not exist')
        )
      ),

  createArticle: async (articleBody, userId) => {
    if (!articleBody) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Article body cannot be empty')
      )
    }
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('User cannot be empty')
      )
    }
    return db(TABLES.ARTICLES)
      .insert({ article_body: articleBody, user_id: userId })
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  },

  updateArticleById: async (articleId, articleBody) => {
    if (!articleBody) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Article body cannot be empty')
      )
    }
    return db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .update({ article_body: articleBody })
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  },

  deleteArticleById: async (articleId) =>
    db(TABLES.ARTICLES)
      .where({ article_id: articleId })
      .del()
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
}
