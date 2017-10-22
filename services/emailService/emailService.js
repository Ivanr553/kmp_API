require('dotenv').config()
const aws = require('aws-sdk')

const Email = {

  send: async function(email) {

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

    let emailResponse = await ses.sendEmail(params)

  },

  sendNewUser: async function(email) {

    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: 'Welcome to Keep Me Posted!'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome from Keep Me Posted'
        }
      },
      ReturnPath: 'keepMePostedEmail@gmail.com',
      Source: 'keepMePosted@gmail.com'
    }

    try {
      let emailResponse = await ses.sendEmail(params).promise()
      return emailResponse
    } catch (err) {
      return err
    }

  }

}


module.exports = Email
