const createHttpError = require('http-errors')
const { getCategories, getCategoryId } = require('../services/categories')
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

  getId: catchAsync(async (req, res, next) => {
    try {
      const category = await getCategoryId(req.params.id)
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
        body: category,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [category - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
