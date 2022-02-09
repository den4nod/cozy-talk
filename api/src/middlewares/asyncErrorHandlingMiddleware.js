module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next))
    .then(() => {
      console.log('Async error handler: no error -> continue')
      next()
    })
    .catch((ex) => {
      console.log('Async error handler: ERROR -> continue')
      next(ex)
    })
