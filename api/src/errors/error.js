const { STATUS_CODES, CONSOLE_COLORS } = require('../services/store/constants')
const UnauthorizedException = require('./UnauthorizedException')

const handleError = (err, res) => {
  const { message, props } = err
  if (props && props.expose) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: 'error',
      message
    })
  }
  if (err instanceof UnauthorizedException) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: 'error',
      message: 'Unauthorized'
    })
  }
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went wrong'
  })
}

const logError = (err, req) => {
  console.error(
    CONSOLE_COLORS.ERROR,
    `[${new Date().toISOString()}] ${req.method} ${req.url}`
  )
  console.error(CONSOLE_COLORS.ERROR, err.stack)
}

class ErrorHandler extends Error {
  constructor(message, props) {
    super(message)
    this.message = message
    this.props = props
  }
}

module.exports = {
  handleError,
  logError,
  ErrorHandler
}
