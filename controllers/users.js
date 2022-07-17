const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      endpointResponse({})
    } catch (error) {
      const httpError = createHttpError()
      next(httpError)
    }
  }),
}
