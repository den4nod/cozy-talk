const passport = require('passport')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const usersService = require('../services/store/users.service')
const googleAuth = require('../services/authConfig').googleAuth

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: googleAuth.clientId,
      clientSecret: googleAuth.clientSecret
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
