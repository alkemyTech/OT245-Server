const { Testimonial } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

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

exports.deleteTestimonial = async (id) => {
  try {
    const testimonial = await Testimonial.destroy({ where: { id } })
    if (!testimonial) {
      throw new ErrorObject('Testimonial not  found', 404)
    }
    return testimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
