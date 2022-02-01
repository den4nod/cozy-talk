const db = require('../../services/db')
const {
  TABLES,
  errorJsonResponse,
  successJsonResponse,
  apiResponse,
  STATUS_CODES
} = require('./constants')

module.exports = {
  getAllAvatars: async () => db(TABLES.AVATARS),

  getAvatarById: async (avatarId) =>
    db(TABLES.AVATARS)
      .where({ avatar_id: avatarId })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse('Avatar does not exist')
        )
      ),

  getUserAvatarById: async (userId) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    return db(TABLES.USERS)
      .where({ user_id: userId })
      .then((user) =>
        db(TABLES.AVATARS)
          .where({ avatar_id: user[0].avatar_id })
          .then((avatar) => apiResponse(STATUS_CODES.SUCCESS, avatar))
          .catch((error) =>
            apiResponse(
              STATUS_CODES.BAD_REQUEST,
              errorJsonResponse(error.message)
            )
          )
      )
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  },

  createUserAvatar: async (userId, avatarPath) => {
    if (!userId) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid user')
      )
    }
    if (!avatarPath) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Invalid avatar')
      )
    }
    return db(TABLES.AVATARS)
      .insert({ avatar_path: avatarPath })
      .returning('avatar_id')
      .then((avatarId) =>
        db(TABLES.USERS)
          .where({ user_id: userId })
          .update({ avatar_id: avatarId[0] })
          .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
          .catch((error) =>
            apiResponse(
              STATUS_CODES.BAD_REQUEST,
              errorJsonResponse(error.message)
            )
          )
      )
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
  },

  deleteAvatarById: async (avatarId) =>
    db(TABLES.AVATARS)
      .where({ avatar_id: avatarId })
      .del()
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.message))
      )
}
