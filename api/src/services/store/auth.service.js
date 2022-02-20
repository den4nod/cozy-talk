const { v4: uuidv4 } = require('uuid')
const sessionsService = require('./session.service')
const usersService = require('./users.service')
const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = {
  authorizeById: async (id) => {
    const user = await usersService.getUserById(id)
    if (user) {
      const accessToken = jwt.sign(
        { user_id: user.user_id, name: user.name },
        config.appKey
      )
      const refreshToken = uuidv4()
      // todo: save expiresIn to sessions table
      await sessionsService.create({
        user_id: user.user_id,
        token: refreshToken
      })
      return { accessToken, refreshToken }
    }
    return {}
  },

  refresh: async (refreshToken) => {
    const session = await sessionsService.getByToken(refreshToken)
    if (session) {
      const user = await usersService.getUserById(session.user_id)
      const accessToken = jwt.sign(
        { user_id: user.id, name: user.name },
        config.appKey
      )
      const refreshToken = uuidv4()
      await sessionsService.deleteByToken(session.token)
      await sessionsService.create({
        user_id: session.user_id,
        token: refreshToken
      })
      return { accessToken, refreshToken }
    }
    return {}
  },

  logout: async (token) => {
    await sessionsService.deleteByToken(token)
  },

  getByToken: async (token) => {
    return await sessionsService.getByToken(token)
  }
}
