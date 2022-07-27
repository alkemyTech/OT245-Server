const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postContact, getContacts } = require('../services/contacts')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const response = await postContact(req.body)
      endpointResponse({
        res,
        message: 'Contact registered successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error registering contact] - [contacts - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  get: catchAsync(async (req, res, next) => {
    try {
      const contacts = await getContacts()
      endpointResponse({
        res,
        message: 'Contacts retrieved successfully',
        body: contacts,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving contacts] - [contacts - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
