const { Testimonial } = require('../database/models')
const { ErrorObject } = require('../helpers/error')
const { getPagination } = require('./categories')

exports.getAllTestimonials = async (page = 1) => {
  try {
    const { limit, offset, nro } = getPagination(page)
    const testimonials = await Testimonial.findAndCountAll({ limit, offset })
    return this.getPagingData(testimonials, nro, limit)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

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

exports.updateTestimonial = async (id, body) => {
  try {
    const testimonial = await Testimonial.findByPk(id)
    if (!testimonial) {
      throw new ErrorObject('Testimonial not found', 404)
    }
    const updatedTestimonial = await testimonial.update(body)
    return updatedTestimonial
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getPagingData = async (data, page, limit) => {
  const url = '/testimonials?page='
  const { count: totalItems, rows: testimonials } = data
  const currentPage = page ? +page : 1
  const finalPage = Math.ceil(totalItems / limit)
  if (page > finalPage) {
    throw new ErrorObject(`page ${page} not found, maximum number of pages: ${finalPage}`, 404)
  }
  const nextPage = totalItems / limit > page ? (currentPage + 1) : null
  const previousPage = currentPage > 1 && currentPage <= finalPage ? currentPage - 1 : null
  const metadata = { finalPage }
  if (previousPage) metadata.previousPage = url + previousPage
  if (nextPage) metadata.nextPage = url + nextPage
  return { testimonials, metadata }
}
