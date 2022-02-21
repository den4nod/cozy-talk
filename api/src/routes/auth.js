const express = require('express')
const router = express.Router()

const authService = require('../services/store/auth.service')

const asyncErrorHandlingMiddleware = require('../middlewares/asyncErrorHandlingMiddleware')
const passport = require('passport')
const UnauthorizedException = require('../errors/UnauthorizedException')

router.post(
  '/refresh',
  asyncErrorHandlingMiddleware(async (req, res) => {
    const { accessToken, refreshToken } = await authService.refresh(
      req.body.refreshToken
    )
    if (accessToken) {
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true
      })
    }
    throw new UnauthorizedException()
  })
)

router.post(
  '/logout',
  asyncErrorHandlingMiddleware(async (req, res) => {
    await authService.logout(req.body.refreshToken)
    return res.send({
      success: true
    })
  })
)

router.post(
  '/google',
  passport.authenticate('google-token', {
    session: false
  }),
  asyncErrorHandlingMiddleware(async (req, res) => {
    const { accessToken, refreshToken } = await authService.authorizeById(
      req.user.id
    )
    if (accessToken) {
      // todo: set max-age and refreshToken to httpOnly cookie
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true
      })
    }
    throw new UnauthorizedException()
  })
)

module.exports = router
