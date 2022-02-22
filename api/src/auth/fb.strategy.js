const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
const usersService = require('../services/store/users.service')
const fbAuth = require('../services/authConfig').fbAuth

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: fbAuth.appId,
      clientSecret: fbAuth.appSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      const [{ value: email }] = profile.emails
      let user = await usersService.getUserByEmail(email)
      if (!user) {
        await usersService.createUser(profile.displayName, email)
        user = await usersService.getUserByEmail(email)
      }

      return done(null, {
        id: user.user_id,
        name: user.name,
        email: user.email
      })
    }
  )
)
