const mongoose = require('mongoose')
const ClassList = require('../../models/classList')
const Phone = require('../../models/phoneList')

const DB = {

  findUser: async function(queryPhone) {
    try{

      // let found = await Phone.findPhone(req.body.newEntry.phone)
      let found = await Phone.findOne({phone: queryPhone})
      return found
    } catch (err) {
      console.log(err)
    }

  },

  saveNewUser: async function(req) {

    //Assigning the body of the request received into a variable
    let request = req.body.newEntry

    //Creating a new Request Document using the received request
    let newPhone = new Phone({
      classIDs: request.newClassID,
      phone: request.phone
    })

    try {

      let phoneResponse = await newPhone.save()
      return phoneResponse
    } catch (err) {
      console.log(err)
    }

  },

  updateUser: async function(newClassID, foundPhone) {
      try {

        //Creating new array with newClassID
        foundPhone.classIDs.push(newClassID)

        let saved = await foundPhone.save()
        return saved
      } catch (err) {
        console.log(err)
      }
  },

  findClassList: async function() {
    try {
      let classList = await ClassList.findById('59ea75feb5a3b9b78ca38a7b')
      return classList
    } catch (err) {
      console.log(err)
    }
  },

  updateClassList: async function(newClassID, foundClassList) {
    try {

      //Adding newClassID to classList array
      classList.classIds.push(newClassID)

      let saveResponse = await classList.save()
      return saveResponse
    } catch (err) {
      console.log(err)
    }
  },

  listContainsMatch: async function(newClassID, entry) {

    //Assigning list to variable
    let list = entry.classIDs

    //Iterating through classList to see if newClassID matches existing classes
    for(let i = 0; i < list.length; i++) {

      //Returning true if match is found
      if(list[i] === newClassID) {
        return false
      }å
    }

    //Returning false if no match found
    return true
  }

}

module.exports = DB
