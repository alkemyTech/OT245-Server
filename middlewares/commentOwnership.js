const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')
const { Comment } = require('../database/models')

exports.commentOwnership = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const comment = await Comment.findByPk(req.params.id)
    const userDecoded = decodeToken(token)
    if (!comment || userDecoded.user.roleId === 1 || userDecoded.user.id === comment.userId) {
      return next()
    }
    throw new ErrorObject('Unauthorized', 401)
  } catch (error) {
    const httpError = createHttpError(
      400,
      `[Error on comment ownership] - [comment - ownership]: ${error}`,
    )
    return next(httpError)
  }
}
