const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  postNew,
  getNewById,
  updateNew,
  deleteNew,
} = require('../services/news')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const news = await postNew(req.body)
      endpointResponse({
        res,
        message: 'New created successfully',
        body: news,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating new] - [new - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const news = await getNewById(req.params.id)
      endpointResponse({
        res,
        message: 'New found successfully',
        body: news,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding new] - [new - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateNew(req)
      endpointResponse({
        res,
        message: 'New updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating new] - [news - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteNew(req.params.id)
      endpointResponse({
        res,
        message: 'New deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting new] - [news - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
