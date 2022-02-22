module.exports = {
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  },
  fbAuth: {
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET
  },
  expTimes: {
    accessTokenExpTime: process.env.ACCESS_TOKEN_EXP_TIME,
    refreshTokenExpTime: process.env.REFRESH_TOKEN_EXP_TIME
  }
}
