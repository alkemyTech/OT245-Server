const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

exports.getCategories = async () => {
  try {
    const categories = await Category.findAll({
      attributes: ['name'],
    })
    return categories
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.postCategory = async (category) => {
  try {
    const newCategory = await Category.create(category)
    return newCategory
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
