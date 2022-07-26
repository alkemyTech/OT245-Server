const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getSlides } = require('../services/slides')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const slides = await getSlides()
      endpointResponse({
        res,
        message: 'Slide found successfully',
        body: slides,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding slides] - [slides - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
