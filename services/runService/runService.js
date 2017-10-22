const mongoose = require('mongoose')

const URL = require('../URLService/URLService')
const DB = require('../dbService/dbService')
const ClassList = require('../../models/classList')

const Script = {

  //Formats the database ClassIDs to proper urls to be used by the URL.checkWaitlist method
  formatURLs: async function() {

    let list = await DB.findClassList()
    list = list.classIDs

    list = list.map( (id) => {
      return URL.constructURL(id)
    })

    return(list)
  },

  run: async function() {

  }

}

module.exports = Script
