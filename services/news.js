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
    const user = await New.findByPk(id)
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateNew = async (req) => {
  try {
    const { id } = req.params
    const { name, content, image } = req.body
    await this.getNewById(id)
    const createdNew = await New.update({
      name,
      content,
      image,
    }, { where: { id } })
    if (!createdNew || createdNew == 0) {
      throw new ErrorObject('New not found', 404)
    }
    return createdNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
