const express = require('express')
const cors = require('cors')
const config = require('./services/config')
const corsConfig = require('./services/corsConfig')
const users = require('./routes/users')
const articles = require('./routes/articles')
const comments = require('./routes/comments')
const likes = require('./routes/likes')
const avatars = require('./routes/avatars')
const files = require('./routes/files')
const auth = require('./routes/auth')
const requestLoggerMiddleware = require('./middlewares/requestLoggerMiddleware')
const dbConfig = require('./services/db')
const targetTableName = require('./services/logConfig')
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware')
const googleStrategy = require('./auth/google.strategy')
const fbStrategy = require('./auth/facebook.strategy')
const bodyParser = require('body-parser')

const session = require('express-session')

const app = express()

googleStrategy.registerStrategy()
fbStrategy.registerStrategy()

app.use(requestLoggerMiddleware({ dbConfig, targetTableName }))

app.use(cors(corsConfig.options))
app.use(bodyParser.json())
app.use(googleStrategy.passport.initialize())

app.use(
  session({
    secret: config.appSessionSecret,
    resave: true,
    saveUninitialized: true
  })
)

app.use(fbStrategy.passport.initialize())
app.use(fbStrategy.passport.session())

app.get('/', function (req, res) {
  res.send('API test')
})

app.use('/users', users)
app.use('/articles', articles)
app.use('/comments', comments)
app.use('/likes', likes)
app.use('/avatars', avatars)
app.use('/files', files)
app.use('/auth', auth)

app.use(errorHandlingMiddleware)
app.listen(config.appPort)
