const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../error')

module.exports = {
  getAllAvatars: async () => db(TABLES.AVATARS),

  getAvatarById: async (avatarId) =>
    db(TABLES.AVATARS).where({ avatar_id: avatarId }),

  getUserAvatarById: async (userId) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    return db(TABLES.USERS)
      .where({ user_id: userId })
      .then((user) =>
        db(TABLES.AVATARS).where({ avatar_id: user[0].avatar_id })
      )
  },

  createUserAvatar: async (userId, avatarPath) => {
    if (!userId) {
      throw new ErrorHandler('Invalid user', {
        expose: true
      })
    }
    if (!avatarPath) {
      throw new ErrorHandler('Invalid avatar', {
        expose: true
      })
    }
    return db(TABLES.AVATARS)
      .insert({ avatar_path: avatarPath })
      .returning('avatar_id')
      .then((avatarId) =>
        db(TABLES.USERS)
          .where({ user_id: userId })
          .update({ avatar_id: avatarId[0] })
          .then(() => {})
      )
  },

  deleteAvatarById: async (avatarId) =>
    db(TABLES.AVATARS)
      .where({ avatar_id: avatarId })
      .del()
      .then(() => {})
}
