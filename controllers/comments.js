const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getComments } = require('../services/comments')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getComments()
      endpointResponse({
        res,
        message: 'comments retrieved successfuly',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving comments] - [comments - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
