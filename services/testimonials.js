const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../database/models')

exports.postTestimonial = async (body) => {
  try {
    const testimonial = await Testimonial.create(body)
    if (!testimonial) {
      throw new ErrorObject('Error creating testimonial', 500)
    }
    return testimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
