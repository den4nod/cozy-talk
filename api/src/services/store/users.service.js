const db = require('../../services/db')
const { TABLES, STATUS_CODES } = require('./constants')
const { customExposedError } = require('../../error')

module.exports = {
  getAllUsers: async () => db(TABLES.USERS).orderBy('name'),

  getUserById: async (userId) => db(TABLES.USERS).where({ user_id: userId }),

  createUser: async (name, email, phone) => {
    if (!name) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Name cannot be empty')
    }
    if (!email) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Email cannot be empty'
      )
    }
    if (!phone) {
      throw customExposedError(
        STATUS_CODES.BAD_REQUEST,
        'Phone cannot be empty'
      )
    }
    return db(TABLES.USERS)
      .insert({ name: name, email: email, phone: phone })
      .then(() => {})
  },

  updateUserById: async (userId, name, email, phone) => {
    if (!name && !email && !phone) {
      throw customExposedError(STATUS_CODES.BAD_REQUEST, 'Nothing to update')
    }
    const updateFields = {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(phone && { phone: phone })
    }
    return await db(TABLES.USERS)
      .where({ user_id: userId })
      .update(updateFields)
      .then(() => {})
  },

  deleteUserById: async (userId) =>
    db(TABLES.USERS)
      .where({ user_id: userId })
      .del()
      .then(() => {})
}
