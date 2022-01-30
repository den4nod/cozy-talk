const express = require('express')
const cors = require('cors')
const config = require('./services/config')
const corsConfig = require('./services/corsConfig')
const users = require('./routes/users')
const articles = require('./routes/articles')
const comments = require('./routes/comments')
const likes = require('./routes/likes')

const app = express()

app.use(cors(corsConfig.options))

app.get('/', function (req, res) {
  res.send('API test')
})

app.use('/users', users)
app.use('/articles', articles)
app.use('/comments', comments)
app.use('/likes', likes)
app.listen(config.appPort)
