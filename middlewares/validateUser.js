const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { verifyToken } = require('./jwt')

const validateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      throw new ErrorObject('Token is required', 403)
    }
    const verify = verifyToken(token)
    if (!verify) {
      throw new ErrorObject('Token is not valid', 403)
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
