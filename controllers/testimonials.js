const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { deleteTestimonial } = require('../services/testimonials')

module.exports = {
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
}
