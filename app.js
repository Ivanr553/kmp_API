const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./config/database')

//MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./router/router')

//Routing
app.use('/', router)

//Connect to database
mongoose.connect(db.db)

//Console logging connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database')
})

mongoose.connection.on('error', (error) => {
  console.log('There was an error connecting to the database: ' + error)
})

module.exports = app
