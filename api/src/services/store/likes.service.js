const db = require('../../services/db')
const {
  TABLES,
  errorJsonResponse,
  successJsonResponse,
  apiResponse,
  STATUS_CODES
} = require('./constants')

module.exports = {
  getAllLikes: async () =>
    db(TABLES.LIKED_ARTICLES).orderBy('date_edited', 'desc'),

  getAllLikesForArticle: async (articleId) => {
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid article')
      )
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({ article_id: articleId })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Failed to return like')
        )
      )
  },

  getAllLikesByUser: async (userId) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({ article_id: userId })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Failed to return like')
        )
      )
  },

  getLikeByUserForArticle: async (userId, articleId) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid article')
      )
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({
        user_id: userId,
        article_id: articleId
      })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Failed to return like')
        )
      )
  },

  createLike: async (userId, articleId) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid article')
      )
    }
    return db(TABLES.LIKED_ARTICLES)
      .insert({ user_id: userId, article_id: articleId })
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  },

  deleteLike: async (userId, articleId) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    if (!articleId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid article')
      )
    }
    return db(TABLES.LIKED_ARTICLES)
      .where({ user_id: userId, article_id: articleId })
      .del()
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  }
}
