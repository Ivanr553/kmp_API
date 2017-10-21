require('dotenv').config()
var AWS = require('aws-sdk')

const SMS = {

  send: (number, collegeClass) => {

    //Initiating new sms
    var sns = new AWS.SNS()

    //Constructing parameters for text message
    var params = {
      Message: 'Your class ' + collegeClass + ' is available!',
      MessageStructure: 'string',
      PhoneNumber: '+1' + number
    }

    //Sending message
    sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })

  }

}


module.exports = SMS
