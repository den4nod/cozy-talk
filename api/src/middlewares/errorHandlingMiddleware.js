const { handleError, logError } = require('../errors/error')

module.exports = (err, req, res, next) => {
  logError(err, req)
  handleError(err, res)
  next()
}
