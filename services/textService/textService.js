require('dotenv').config()
var AWS = require('aws-sdk')
AWS.config.setPromisesDependency(null);

const SMS = {

  send: async function(number, collegeClass) {

    //Initiating new sms
    var sns = new AWS.SNS()

    //Constructing parameters for text message
    var params = {
      Message: 'Your class ' + collegeClass + ' is available!',
      MessageStructure: 'string',
      PhoneNumber: '+1' + number
    }

    try {
      let snsResponse = await sns.publish(params).promise()
      return snsResponse
    } catch (err) {
      return err
    }
  },

  sendNewUser: async function(number) {
    let sns = new AWS.SNS()

    let params = {
      Message: 'Welcome to Keep Me Posted! Leave the rest up to us, we will let you know when your class is free!',
      MessageStructure: 'string',
      PhoneNumber: '+1' + number
    }

    console.log(number)

    try {
      let snsResponse = await sns.publish(params).promise()
      return snsResponse
    } catch (err) {
      return err
    }
  }
}


module.exports = SMS
