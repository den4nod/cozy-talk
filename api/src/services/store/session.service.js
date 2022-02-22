const db = require('../../services/db')
const { TABLES } = require('./constants')

module.exports = {
  create: (session) => db(TABLES.SESSIONS).insert(session),

  getByToken: (token) =>
    db().select().first().from(TABLES.SESSIONS).where('token', token),

  deleteByToken: (token) => db(TABLES.SESSIONS).where('token', token).del(),

  deleteAllTokens: (userId) =>
    db(TABLES.SESSIONS).where('user_id', userId).del()
}
