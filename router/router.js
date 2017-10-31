const express = require('express')
const router = express.Router()

const DB = require('../services/dbService/dbService')
const URL = require('../services/URLService/URLService')
const SMS = require('../services/textService/textService')
const Script = require('../services/runService/runService')

router.post('/entry', async (req, res) => {

  let response = await Script.runNewEntry(req)

  console.log(response)
  res.send(response)

})


router.get('/run', async (req, res) => {

  //Constructing the userlist to send texts to
  let availableClassList = await Script.findAvailableClasses()
  let availableUserList = await Script.createAvailableUserList(availableClassList)

  //Looping through each user and sending a text for each of them
  for(let user of availableUserList) {
    try{
      let smsResponse = await SMS.sendAvailableClass(user)
      console.log(smsResponse)
    } catch(err) {
      console.log(err)
    }

  }

  res.send('running')

})


module.exports = router
