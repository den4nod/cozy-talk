const express = require('express')
const config = require('./services/config')
const users = require('./routes/users')

const app = express()

app.get('/', function (req, res) {
  res.send('API test')
})

app.use('/users', users)
app.listen(config.appPort)
