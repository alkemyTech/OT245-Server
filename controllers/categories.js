const createHttpError = require('http-errors')
const {
  getCategories,
  getCategoryById,
  updateCategory,
  postCategory,
} = require('../services/categories')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../services/categories')

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
  put: catchAsync(async (req, res, next) => {
    try {
      const updatedCategory = await updateCategory(req)
      endpointResponse({
        res,
        message: 'Category updated successfully',
        body: updatedCategory,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating category] - [categories - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteCategory(req.params.id)
      endpointResponse({
        res,
        message: 'category deleted successfully',
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
        `[Error deleting category] - [categories - DELETE]: ${error.message}`,
        `[Error creating category] - [Category - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
