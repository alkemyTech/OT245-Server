const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postTestimonial } = require('../services/testimonials')

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
}
