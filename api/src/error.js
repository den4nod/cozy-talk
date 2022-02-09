const { STATUS_CODES, CONSOLE_COLORS } = require('./services/store/constants')
const createError = require('http-errors')

const handleError = (err, res) => {
  const { statusCode, message, expose } = err
  if (expose) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    })
  } else {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong'
    })
  }
}

const logError = (err, req) => {
  console.error(
    CONSOLE_COLORS.ERROR,
    `[${new Date().toISOString()}] ${req.method} ${req.url}`
  )
  console.error(CONSOLE_COLORS.ERROR, err.stack)
}

const customExposedError = (statusCode, message) =>
  createError(statusCode, message, {
    expose: true
  })

module.exports = {
  handleError,
  logError,
  customExposedError
}
