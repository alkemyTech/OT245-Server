const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')
const { getUserByEmail } = require('../services/users')

const verifyOwnership = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const user = await decodeToken(token)
    const databaseUser = await getUserByEmail(user.email)
    if (user.id !== databaseUser.id) {
      if (user.roleId !== 1) {
        throw new ErrorObject('user id doesnt match', 403)
      }
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

module.exports = {
  verifyOwnership,
}
