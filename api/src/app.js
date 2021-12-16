const express = require('express')
const config = require('./services/config')

const app = express()

app.get('/', function (req, res) {
  res.send('API test')
})

app.listen(config.appPort)
