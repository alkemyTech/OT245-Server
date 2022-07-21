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

exports.getCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id)

    if (!category) {
      throw new ErrorObject('Category not found', 404)
    }
    return category
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

exports.updateCategory = async (req) => {
  try {
    const { id } = req.params
    const { name, description, image } = req.body
    await this.getCategoryById(id)
    const updatedCategory = await Category.update({
      name,
      description,
      image,
    }, { where: { id } })
    return updatedCategory
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteCategory = async (id) => {
  try {
    const category = await Category.destroy({ where: { id } })
    if (!category) {
      throw new ErrorObject('Category not found', 404)
    }
    return category
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
