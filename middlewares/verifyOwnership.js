const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')
const { getUserByEmail } = require('../services/users')

const verifyOwnership = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const { user } = decodeToken(token)
    const id = getUserByEmail(user.email)
    if (user.id !== id || user.role !== 1) {
      throw new ErrorObject('Token user id doesnt match', 403)
    }
    next()
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error verifying ownership] - [users - destroy]: ${error.message}`,
    )
    next(httpError)
  }
}

module.export = {
  verifyOwnership,
}
