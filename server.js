const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

//MiddleWare
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./router/router')

app.use('/', router)

app.listen(8080, function() {
  console.log('connected on port', 8080)
})

// var req = new XMLHttpRequest();
// req.open('GET', 'http://www.mydomain.com/', false);
// req.send(null);
// console.log(req.responseText)
