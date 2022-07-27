const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getSlides, getSlideById, deleteSlide } = require('../services/slides')

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

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await getSlideById(id)
      endpointResponse({
        res,
        message: 'Slide found successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding slides] - [slides - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await deleteSlide(id)
      endpointResponse({
        res,
        message: 'Slide deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting slide] - [slides - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
