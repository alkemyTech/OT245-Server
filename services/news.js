const { ErrorObject } = require('../helpers/error')
const { New } = require('../database/models')

exports.postNew = async (body) => {
  try {
    const createNew = await New.create(body)
    return createNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getNewById = async (id) => {
  try {
    const newById = await New.findByPk(id)
    if (!newById) {
      throw new ErrorObject('New not found', 404)
    }
    return newById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateNew = async (req) => {
  try {
    const { id } = req.params
    const { name, content, image } = req.body
    const existentNew = await this.getNewById(id)
    if (!existentNew || existentNew.length === 0) {
      throw new ErrorObject('New not found', 404)
    }
    const createdNew = await New.update({
      name,
      content,
      image,
    }, { where: { id } })
    return createdNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
