const createHttpError = require('http-errors')
const { decode } = require('jsonwebtoken')
const { ErrorObject } = require('../helpers/error')

const validateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      throw new ErrorObject('Token is required', 403)
    }
    const { user } = decode(token)
    if (!user) {
      throw new ErrorObject('Token is not valid ', 403)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(error.statusCode, `[Token is not valid]: ${error.message}`)
    next(httpError)
  }
}

module.exports = {
  validateToken,
}
