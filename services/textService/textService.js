require('dotenv').config()
var AWS = require('aws-sdk')
AWS.config.setPromisesDependency(null);

const SMS = {

  //Sends a text message once class is available
  //Accepts the phone number as a string and the college class as a string as arguments
  sendAvailableClass: async function(user) {

    //Initiating new sms
    var sns = new AWS.SNS();

    //Constructing parameters for text message
    var params = {
      Message: 'One of your classes is available, go online and register! If someone managed to register before you, no worries. Just re-sign up again on our website to be notified about that class again!',
      MessageStructure: 'string',
      PhoneNumber: '+1' + user.phone
    }

    try {
      let snsResponse = await sns.publish(params).promise()
      return snsResponse
    } catch (err) {
      return err
    }

  },

  //Sends a text message to notify a new user they have successfully been added to our system
  //Accepts the phone number as a string as an argument
  sendNewUser: async function(number) {
    let sns = new AWS.SNS()

    let params = {
      Message: 'Welcome to Keep Me Posted! Leave the rest up to us, we will let you know when your class is free!',
      MessageStructure: 'string',
      PhoneNumber: '+1' + number
    }

    try {
      let snsResponse = await sns.publish(params).promise()
      return snsResponse
    } catch (err) {
      return err
    }
  }
}


module.exports = SMS
