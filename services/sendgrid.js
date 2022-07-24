const sgMail = require('@sendgrid/mail')
const { ErrorObject } = require('../helpers/error')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const postMail = async (email) => {
  const msg = {
    to: email,
    from: process.env.EMAILFROM,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  try {
    await sgMail.send(msg)

    return msg
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
module.exports = { postMail }
