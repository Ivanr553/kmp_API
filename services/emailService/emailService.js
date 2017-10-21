require('dotenv').config()
const aws = require('aws-sdk')

const Email = {

  send: () => {

    const ses = new aws.SES()

    const params = {
      Destination: {
        ToAddresses: ['ivanr553@gmail.com']
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: 'Hello from node server'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'AWS Email'
        }
      },
      ReturnPath: 'ivanr553@gmail.com',
      Source: 'ivanr553@gmail.com'
    }

    ses.sendEmail(params, (err, data) => {
      if(err) console.log(err, err.stack)
      else console.log(data)
    })

  }

}


module.exports = Email
