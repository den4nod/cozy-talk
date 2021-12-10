require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('API test');
});

app.listen(process.env.APP_PORT);
