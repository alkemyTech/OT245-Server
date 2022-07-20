const createHttpError = require('http-errors')
const { getCategories, getCategoryById, postCategory } = require('../services/categories')
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
  getCategoryById: catchAsync(async (req, res, next) => {
    try {
      const category = await getCategoryById(req.params.id)
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
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description, image } = req.body
      const response = await postCategory({ name, description, image })
      endpointResponse({
        res,
        message: 'Category created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating category] - [Category - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}