class UnauthorizedException extends Error {
  constructor(message) {
    console.log('unauthorized exception initiated')
    super(message)
    this.name = 'UnauthorizedException'
  }
}

module.exports = UnauthorizedException
