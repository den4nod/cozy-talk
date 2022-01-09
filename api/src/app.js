const express = require('express')
const config = require('./services/config')
const users = require('./routes/users')
const articles = require('./routes/articles')

const app = express()

app.get('/', function (req, res) {
  res.send('API test')
})

app.use('/users', users)
app.use('/articles', articles)
app.listen(config.appPort)
