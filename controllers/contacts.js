const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postContact } = require('../services/contacts')

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
}
