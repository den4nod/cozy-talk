module.exports = {
  options: {
    origin:
      process.env.FRONT_PROTOCOL +
      '://' +
      process.env.FRONT_HOST +
      ':' +
      process.env.FRONT_PORT,
    optionsSuccessStatus: process.env.CORS_SUCCESS_STATUS
  }
}
