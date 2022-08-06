const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

exports.getComments = async () => {
  try {
    const comments = await Comment.findAll({
      attributes: ['body'],
      order: [['createdAt', 'DESC']],
    })
    return comments
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.postComment = async (body) => {
  try {
    const comment = await Comment.create(body)
    return comment
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
