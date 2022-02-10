module.exports = (options) => (req, res, next) => {
  const { dbConfig, targetTableName } = options
  return dbConfig(targetTableName)
    .insert({ method: req.method, url: req.url })
    .then(() => next())
}
