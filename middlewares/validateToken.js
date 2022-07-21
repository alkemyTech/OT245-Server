const createHttpError = require('http-errors')
const { decode } = require('jsonwebtoken')
const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')

const validateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      throw new ErrorObject('Token is required', 403)
    }
    const { user } = decode(token)
    const userExist = await User.findByPk(user.id)
    if (!userExist) {
      throw new ErrorObject('Token is not valid - user not exist in db', 403)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Token is not valid]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  validateToken,
}
