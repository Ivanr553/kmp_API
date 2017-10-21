const express = require('express')
const router = express.Router()

const DB = require('../services/dbService/dbService')
const Source = require('../services/sourceService/sourceService')
const Email = require('../services/emailService/emailService')
const SMS = require('../services/textService/textService')
const Script = require('../services/runService/runService')

router.post('/entry', async (req, res) => {

    let response = {
      phoneList: {},
      classList: {},
      status: 'OK'
    }

    //Assigning variables from request
    let newClassID = req.body.newClassID

    //Finding database entries asynchronously
    let foundPhone = await DB.findUser(req.body.phone)
    console.log(foundPhone)
    let ClassList = await DB.findClassList()
    console.log(ClassList)

    //Handling phoneList database entry
    if(foundPhone) {

      if(DB.listContainsMatch(newClassID, foundPhone)) {
        response.phoneList.status = 'Class already linked'

      } else {
        let saveResponse = await DB.updateUser(newClassID, foundPhone)
        console.log(saveResponse)
        response.phoneList.status = 'Class link added'
        response.phoneList.response = saveResponse
      }

    } else {
      let saveResponse = await DB.saveNewUser(req)
      console.log(saveResponse)
      response.phoneList.status = 'New phone and class added'
      response.phoneList.response = saveResponse
    }

    //Handling ClassList database entry
    if(DB.listContainsMatch(newClassID, ClassList)) {
      response.classList.status = 'Contains match'
    } else {
      let saveResponse = await DB.updateClassList(newClassID, ClassList)
      console.log(saveResponse)
      response.classList.status = 'No match'
    }

  console.log(response)
  res.send(response)

})


router.get('/run', async (req, res) => {

  res.send('running')

})


module.exports = router
