const sgMail = require('@sendgrid/mail')
const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')
const { html } = require('../templates/welcomeEmail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const postMail = async (email, subject = 'Bienvendio a alkemy') => {
  const organization = await Organization.findAll()
  const msg = {
    to: email,
    from: process.env.EMAILFROM,
    subject,
    html: html(organization[0]),
  }
  try {
    await sgMail.send(msg)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
module.exports = { postMail }
