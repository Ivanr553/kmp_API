require('dotenv').config()
var AWS = require('aws-sdk')

const SMS = {

  //Accepts number and college class as strings
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

      let snsResponse = await sns.publish(params)
      return snsResponse
    } catch (err) {
      console.log(err)
    }

  }

}


module.exports = SMS
