const express = require('express')
const router = express.Router()

const DB = require('../services/dbService/dbService')
const Source = require('../services/sourceService/sourceService')
const Email = require('../services/emailService/emailService')
const SMS = require('../services/textService/textService')
const Script = require('../services/runService/runService')

router.get('/', (req, res) => {

  res.send('Welcome to the keep me posted API!')

})

router.post('/entry', async (req, res) => {

    let response = {
      phoneList: {},
      classList: {},
      status: 'OK'
    }

    //Assigning variables from request
    let newClassID = req.body.newEntry.newClassID

    //Finding database entries asynchronously
    let foundPhone = await DB.findPhone(req.body.newEntry.phone)
    let ClassList = await DB.findClassList()

    //Handling phoneList database entry
    if(foundPhone) {

      if(DB.listContainsMatch(newClassID, foundPhone)) {
        response.phoneList.status = 'Class already linked'

      } else {
        let saveResponse = await DB.updatePhone(newClassID, foundPhone)
        response.phoneList.status = 'Class link added'
        response.phoneList.response = saveResponse
      }

    } else {
      let saveResponse = await DB.saveNewPhone(req)
      response.phoneList.status = 'New phone and class added'
      response.phoneList.response = saveResponse
    }

    //Handling ClassList database entry
    if(DB.listContainsMatch(newClassID, ClassList)) {
      response.classList.status = 'Contains match'
    } else {
      let saveResponse = await DB.updateClassList(newClassID, ClassList)
      response.classList.status = 'No match'
    }

  res.send(response)

})


router.get('/run', async (req, res) => {

  res.send('running')

})


module.exports = router
