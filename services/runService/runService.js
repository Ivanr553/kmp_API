const mongoose = require('mongoose')

const Source = require('../sourceService/sourceService')
const DB = require('../dbService/dbService')
const ClassList = require('../../models/classList')

const Script = {

  formatData: () => {

    (async () => {
      try {

        let classList = await ClassList.findById('59ea75feb5a3b9b78ca38a7b')
        console.log(classList)
      } catch (err) {

        console.log(err)
      }
    })()

    // getClassList()

  },

  run: () => {

    Source.getHtmlSource()

  }

}

module.exports = Script
