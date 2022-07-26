const { ErrorObject } = require('../helpers/error')
const { Slide } = require('../database/models')

exports.getSlides = async () => {
  try {
    const slides = await Slide.findAll({
      attributes: ['image', 'order'],
    })
    return slides
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getSlideById = async (id) => {
  try {
    const slides = await Slide.findByPk(id)
    if (!slides) {
      throw new ErrorObject('Slide not found', 404)
    }
    return slides
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
