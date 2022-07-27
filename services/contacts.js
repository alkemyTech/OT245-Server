const { ErrorObject } = require('../helpers/error')
const { Contact } = require('../database/models')

exports.postContact = async (body) => {
  try {
    const existentContact = await this.getContactByEmail(body.email)
    if (existentContact) {
      throw new ErrorObject('Email already registered', 404)
    }
    const contact = await Contact.create(body)
    if (!contact) {
      throw new ErrorObject('failed contact registration', 403)
    }
    return contact
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getContacts = async () => {
  try {
    const contacts = await Contact.findAll()
    return contacts
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getContactByEmail = async (email) => {
  try {
    const contact = await Contact.findOne({ where: { email } })
    return contact
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
