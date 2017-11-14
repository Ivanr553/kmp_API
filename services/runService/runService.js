const mongoose = require('mongoose')

const URL = require('../URLService/URLService')
const DB = require('../dbService/dbService')
const ClassList = require('../../models/classList')
const SMS = require('../textService/textService')

const Script = {

  //Formats the database ClassIDs to proper urls to be used by the URL.checkWaitlist method
  findAvailableClasses: async function() {

    let classList = await DB.findClassList()

    classList = URL.construct(classList)

    let availableClassList = []

    for(let entry of classList) {
      const result = await URL.checkWaitlist(entry.url)
      if(result) {
        availableClassList.push(entry)
      }
    }

    return availableClassList

  },

  //Accepts formatted classList (from findAvailableClasses) andreturns an array of phone numbers as strings
  createAvailableUserList: async function(availableClassList) {

    let availablePhones = []
    let availableUserList = []

    //Iterating through each entry in the availableClassList array
    for (let item of availableClassList) {

      let classID = item.classID

      //Checking database for each user that has the available classes and extracting phones
      try{
        let users = await DB.findUsersByClass(classID)
        for(let user of users) {
          if(availablePhones.indexOf(user.phone) < 0) {
            availablePhones.push(user.phone)
            let availableUser = {
              classID: classID,
              phone: user.phone
            }
            availableUserList.push(availableUser)
          }
        }
      } catch(err) {
        throw err
      }

    }

    return availableUserList

  },

  //Handles the request from the website for new data entries
  //Takes the request as the argument and returns a formatted response for the website
  runNewEntry: async function(req) {

    //Constructing response object
    let response = {
      phoneList: {},
      classList: {},
      sms: {},
      responseStatus: 'OK'
    }

    //Assigning variables from request
    let newClassID = req.body.newClassID

    //Finding database entries asynchronously
    let foundPhone = await DB.findUserByPhone(req.body.phone)
    let ClassList = await DB.findClassList()

    //Handling phoneList database entry
    if(foundPhone) {

      if(DB.listContainsMatch(newClassID, foundPhone)) {
        response.phoneList.status = 'Class already linked'

      } else {
        let saveResponse = await DB.updateUser(newClassID, foundPhone)

        //Error Handling
        if(saveResponse.name === 'ValidationError') {
          response.phoneList.status = 'Error updating phone'
          response.phoneList.response = saveResponse
          resposne.responseStatus = 'ERR'
        } else {
          response.phoneList.status = 'Class link added'
          response.phoneList.response = saveResponse
        }
      }

    } else {
      let saveResponse = await DB.saveNewUser(req)

      //Error Handling
      if(saveResponse.name === 'ValidationError') {
        response.phoneList.status = 'Error with new phone entry'
        response.phoneList.response = saveResponse
        response.responseStatus = 'ERR'
      } else {
        response.phoneList.status = 'New phone and class added'
        response.phoneList.response = saveResponse
      }

      //SMS response
      let smsResponse = await SMS.sendNewUser(req.body.phone)
      response.sms.status = 'Sent'
      response.sms.response = smsResponse
    }

    //Handling ClassList database entry
    if(DB.listContainsMatch(newClassID, ClassList)) {
      response.classList.status = 'Contains match'
    } else {
      let saveResponse = await DB.updateClassList(newClassID, ClassList)

      //Error Handling
      if(saveResponse.name === 'ValidationError') {
        response.classList.status = 'Error updating ClassList'
        response.classList.response = saveResponse
        response.responseStatus = 'ERR'
      } else {
        response.classList.status = 'New class added to ClassList'
        response.classList.response = saveResponse
      }
    }

    return response

  }

}

module.exports = Script
