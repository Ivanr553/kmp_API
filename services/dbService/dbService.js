const mongoose = require('mongoose')
const ClassList = require('../../models/classList')
const Phone = require('../../models/phoneList')

const DB = {

  //Accetps phone number as string for the argument and returns the user with that phone number
  findUserByPhone: async function(queryPhone) {
    try {
      let found = await Phone.findOne({phone: queryPhone})
      return found
    } catch (err) {
      return (err)
    }
  },

  //Accepts a classID as argument and returns an array of users that have that class in their classIDs array
  findUsersByClass: async function(queryClassID) {
    try {
      let found = await Phone.find({"classIDs": queryClassID})
      return found
    } catch (err) {
      return err
    }
  },

  //Takes the request object as an argument and will return the response from the database for the new user entry
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
      return (err)
    }
  },

  //Accepts the newClassID to be updated and the phone database entry as arguments and returns the response from the database
  updateUser: async function(newClassID, foundPhone) {
      try {

        //Creating new array with newClassID
        foundPhone.classIDs.push(newClassID)

        let saved = await foundPhone.save()
        return saved
      } catch (err) {
        return (err)
      }
  },

  deleteClassFromUser: async function(user, classID) {
    let result;
    try {
      for(let userClassID of user.classIDs) {
        if(userClassID == classID) {
          user.classIDs.splice(user.classIDs.indexOf(classID), 1)
          result = await user.save()
        }
      }
    } catch(err) {
      console.log(err)
    }
    return result
  },

  //Finds the primary (and only) ClassList and returns it
  findClassList: async function() {
    try {
      let classList = await ClassList.findById('59ea75feb5a3b9b78ca38a7b')
      return classList
    } catch (err) {
      return (err)
    }
  },

  //Takes in the newClassID to be updated and the primary ClassList and returns the database response
  updateClassList: async function(newClassID, foundClassList) {
    try {
      //Adding newClassID to classList array
      foundClassList.classIDs.push(newClassID)

      let saveResponse = await foundClassList.save()
      return saveResponse
    } catch (err) {
      return (err)
    }
  },

  deleteClassFromList: async function(classList, classID) {
    let result;
    try {
      classList.classIDs.forEach( (foundClassID, index)=>{

      } )
      for(let foundClassID of classList.classIDs) {
        if(foundClassID == classID) {
          classList.classIDs.splice(classList.classIds.indexOf(classID), 1)
          result = await classList.save()
        }
      }
    } catch(err) {
      console.log(err)
    }
    return result
  },

  //Accepts the newClassID and the database entry to be checked and will return
  // a boolean indicating whether or not the newClassID exists in that database entry
  listContainsMatch: function(newClassID, entry) {

    //Assigning list to variable
    let list = entry.classIDs

    //Iterating through classList to see if newClassID matches existing classes
    for(let i = 0; i < list.length; i++) {
      if(list[i] === newClassID) {
        return true
      }
    }

    //Returning false if no match found
    return false
  }

}

module.exports = DB
