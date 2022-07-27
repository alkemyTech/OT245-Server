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

exports.deleteSlide = async (id) => {
  try {
    const existentSlide = await Slide.findOne({ where: { id } })
    if (!existentSlide || existentSlide.length === 0) {
      throw new ErrorObject('Slide not found', 404)
    }
    const deletedSlide = await Slide.destroy({ where: { id } })
    return deletedSlide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateSlide = async (req) => {
  try {
    const { id } = req.params
    const { image, text, order } = req.body
    await Slide.update(
      {
        image,
        text,
        order,
      },
      { where: { id } },
    )
    const slide = await Slide.findByPk(id)
    if (!slide) {
      throw new ErrorObject('Slide not found', 404)
    }
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
