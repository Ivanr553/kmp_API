const express = require('express')
const router = express.Router()

const Script = require('../script/script')

router.get('/', (req, res) => {
  res.send('App is live')
})

router.post('/script', (req, res) => {

  console.log(req.body)

  res.send({message: Script.getHtmlSource(Script.parseReq(req.body))})

  // res.send({message: 'Request received'})


})


module.exports = router
