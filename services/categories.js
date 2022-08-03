const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

exports.getCategories = async (page) => {
  try {
    const limit = 10
    const offset = page ? limit * (page - 1) : 0
    const data = await Category.findAndCountAll({ attributes: ['name'], limit, offset })
    return this.getPagingData(data, page, limit)
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

exports.getPagingData = async (data, page, limit) => {
  const url = '/categories?page='
  const { count: totalItems, rows: categories } = data
  const currentPage = page ? +page : 1
  const finalPage = Math.ceil(totalItems / limit)
  const nextPage = totalItems / limit > page ? (currentPage + 1) : null
  const previousPage = currentPage > 1 && currentPage <= finalPage ? currentPage - 1 : null
  const metadata = { finalPage }
  if (previousPage) metadata.previousPage = url + previousPage
  if (nextPage) metadata.nextPage = url + nextPage
  return { categories, metadata }
}
