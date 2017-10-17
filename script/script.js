const express = require('express')
const router = express.router()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

router.post('/', (req, res) => {
  console.log('received')

  res.send({message: 'Request received'})
})
