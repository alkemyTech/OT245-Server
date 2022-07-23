const { ErrorObject } = require('../helpers/error')
const { New } = require('../database/models')

module.exports.postNew = async (body) => {
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
