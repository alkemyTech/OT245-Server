const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

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

exports.deleteComment = async (id) => {
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      throw new ErrorObject('Comment not found', 404)
    }
    await comment.destroy()
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
