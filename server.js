const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

//MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const script = require('./script/script')

app.use('/', router)

module.exports = app

// var req = new XMLHttpRequest();
// req.open('GET', 'http://www.mydomain.com/', false);
// req.send(null);
// console.log(req.responseText)
