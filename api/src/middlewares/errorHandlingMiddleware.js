const { handleError, logError } = require('../error')

module.exports = (err, req, res, next) => {
  logError(err, req)
  handleError(err, res)
  next()
}
