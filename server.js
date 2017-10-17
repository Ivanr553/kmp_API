const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

//MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./router/router')

app.use('/', router)

module.exports = app
