const UnauthorizedException = require('../errors/UnauthorizedException')

module.exports = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  next(new UnauthorizedException())
}
