const express = require('express')
const router = express.Router()

const DB = require('../services/dbService/dbService')
const URL = require('../services/URLService/URLService')
const SMS = require('../services/textService/textService')
const Script = require('../services/runService/runService')

router.post('/entry', async (req, res) => {

  let reponse = await Script.runNewEntry(req)

  console.log(response)
  res.send(response)

})


router.get('/run', async (req, res) => {

  // let availableClassList = await Script.findAvailableClasses()
  // let availablePhones = await Script.findAvailablePhones(availableClassList)
  // console.log(availablePhones)

  SMS.sendAvailableClass('8056241556', 'class')
  // console.log(smsResponse)

  res.send('running')

})


module.exports = router
