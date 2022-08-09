const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postTestimonial, updateTestimonial, getAllTestimonials } = require('../services/testimonials')
const { deleteTestimonial } = require('../services/testimonials')

module.exports = {
  getAll: catchAsync(async (req, res, next) => {
    try {
      const response = await getAllTestimonials(req.query.page)
      endpointResponse({
        res,
        message: 'Testimonials obtained successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error obtaining testimonials] - [testimonials - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const response = await postTestimonial(req.body)
      endpointResponse({
        res,
        message: 'Testimonial created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating testimonial] - [testimonials - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteTestimonial(req.params.id)
      endpointResponse({
        res,
        message: 'Testimonial deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting testimonial] - [testimonials - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateTestimonial(req)
      endpointResponse({
        res,
        message: 'Testimonial updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving info] - [Testimonial - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),

}
