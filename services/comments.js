const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')
const { decodeToken } = require('../middlewares/jwt')

exports.getComments = async () => {
  try {
    const comments = await Comment.findAll({
      attributes: ['body'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    return comments
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteComment = async (id, token) => {
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      throw new ErrorObject('Comment not found', 404)
    }
    const userDecoded = decodeToken(token)
    if (userDecoded.user.roleId === 1 || userDecoded.user.id === comment.userId) {
      await comment.destroy()
      return true
    }
    throw new ErrorObject('Unauthorized', 401)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
