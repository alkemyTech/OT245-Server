const createHttpError = require('http-errors')
const { getCategories } = require('../services/categories')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const categories = await getCategories()
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
        body: categories,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving categories] - [categories - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}