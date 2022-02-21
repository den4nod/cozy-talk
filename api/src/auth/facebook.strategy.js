const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const usersService = require('../services/store/users.service')
const fbAuth = require('../services/authConfig').fbAuth

const registerStrategy = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: fbAuth.appId,
        clientSecret: fbAuth.appSecret,
        callbackURL: 'http://localhost:3090/auth/facebook/callback',
        profileFields: ['id', 'email', 'displayName']
      },
      async (accessToken, refreshToken, profile, cb) => {
        const [{ value: email }] = profile.emails
        let user = await usersService.getUserByEmail(email)
        if (!user) {
          await usersService.createUser(profile.displayName, email)
          user = await usersService.getUserByEmail(email)
        }
        return cb(null, {
          id: user.user_id,
          name: user.name,
          email: user.email
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getUserById(id)
    done(null, user)
  })
}

module.exports = {
  registerStrategy,
  passport
}
