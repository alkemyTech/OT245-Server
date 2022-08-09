const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getComments, postComment, deleteComment } = require('../services/comments')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getComments()
      endpointResponse({
        res,
        message: 'comments retrieved successfuly',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving comments] - [comments - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    const { body } = req
    try {
      const comment = await postComment(body)
      endpointResponse({
        res,
        code: 200,
        message: 'Comment Created',
        body: comment,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating comment]- [Comment - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await deleteComment(id)
      endpointResponse({
        res,
        message: 'Comment successfully deleted',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting comment] - [comments - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
