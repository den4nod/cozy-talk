const express = require('express')
const cors = require('cors')
const config = require('./services/config')
const corsConfig = require('./services/corsConfig')
const users = require('./routes/users')
const articles = require('./routes/articles')
const comments = require('./routes/comments')
const likes = require('./routes/likes')
const avatars = require('./routes/avatars')
const requestLoggerMiddleware = require('./middlewares/requestLoggerMiddleware')
const dbConfig = require('./services/db')
const targetTableName = require('./services/logConfig')
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware')

const app = express()

app.use(requestLoggerMiddleware({ dbConfig, targetTableName }))
app.use(cors(corsConfig.options))

app.get('/', function (req, res) {
  res.send('API test')
})

app.use('/users', users)
app.use('/articles', articles)
app.use('/comments', comments)
app.use('/likes', likes)
app.use('/avatars', avatars)

app.use(errorHandlingMiddleware)
app.listen(config.appPort)
