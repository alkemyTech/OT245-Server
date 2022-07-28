const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postTestimonial } = require('../services/testimonials')
const { deleteTestimonial } = require('../services/testimonials')

module.exports = {
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

<<<<<<< HEAD
  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateTestimonial(req)
      endpointResponse({
        res,
        message: 'Testimonial updated successfully',
=======
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteTestimonial(req.params.id)
      endpointResponse({
        res,
        message: 'Testimonial deleted successfully',
>>>>>>> 08f2c14f98744d35f76f5afd690f83d79d895e8a
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
<<<<<<< HEAD
        `[Error retrieving info] - [Testimonial - PUT]: ${error.message}`,
=======
        `[Error deleting testimonial] - [testimonials - DELETE]: ${error.message}`,
>>>>>>> 08f2c14f98744d35f76f5afd690f83d79d895e8a
      )
      next(httpError)
    }
  }),
}
