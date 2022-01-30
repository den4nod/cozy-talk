const db = require('../../services/db')
const {
  TABLES,
  errorJsonResponse,
  successJsonResponse,
  apiResponse,
  STATUS_CODES
} = require('./constants')

module.exports = {
  getAllUsers: async () => db(TABLES.USERS).orderBy('name'),

  getUserById: async (userId) =>
    db(TABLES.USERS)
      .where({ user_id: userId })
      .then((result) => apiResponse(STATUS_CODES.SUCCESS, result))
      .catch(() =>
        apiResponse(
          STATUS_CODES.BAD_REQUEST,
          errorJsonResponse(`User does not exist`)
        )
      ),

  createUser: async (name, email, phone) => {
    if (!name) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Name cannot be empty')
      )
    }
    if (!email) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Email cannot be empty')
      )
    }
    if (!phone) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Phone cannot be empty')
      )
    }
    return db(TABLES.USERS)
      .insert({ name: name, email: email, phone: phone })
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
  },

  updateUserById: async (userId, name, email, phone) => {
    if (!name && !email && !phone) {
      return apiResponse(
        STATUS_CODES.BAD_REQUEST,
        errorJsonResponse('Nothing to update')
      )
    }
    const updateFields = {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(phone && { phone: phone })
    }
    await db(TABLES.USERS)
      .where({ user_id: userId })
      .update(updateFields)
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
  },

  deleteUserById: async (userId) =>
    db(TABLES.USERS)
      .where({ user_id: userId })
      .del()
      .then(() => apiResponse(STATUS_CODES.SUCCESS, successJsonResponse))
      .catch((error) =>
        apiResponse(STATUS_CODES.BAD_REQUEST, errorJsonResponse(error.name))
      )
}
