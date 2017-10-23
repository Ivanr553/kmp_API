require('dotenv').config()
var AWS = require('aws-sdk')
// AWS.config.setPromisesDependency(null);

const SMS = {

  //Sends a text message once class is available
  //Accepts the phone number as a string and the college class as a string as arguments
  sendAvailableClass: async function(number, collegeClass) {

    //Initiating new sms
    var sns = new AWS.SNS({
      region: 'us-east-1'
    });

    //Constructing parameters for text message
    var params = {
      Message: 'Your class class is available!',
      PhoneNumber: '+18056241556'
    }

    console.log(params)

    // try {
    //   let snsResponse = await sns.publish(params).promise()
    //   return snsResponse
    // } catch (err) {
    //   return err
    // }

    sns.publish(params, (err, data) => {
      if(err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
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
