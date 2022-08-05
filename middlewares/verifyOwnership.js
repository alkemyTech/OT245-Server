const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')

const verifyOwnership = async (req, res, next) => {
  try {
    const { id: paramsId } = req.params
    const token = req.header('Authorization')
    const userDecodedToken = await decodeToken(token)
    if (userDecodedToken.user.id !== Number(paramsId)) {
      if (userDecodedToken.user.roleId !== 1) {
        throw new ErrorObject('user doesnt match', 403)
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
