const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postMember, updateMember } = require('../services/members')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const users = await postMember(req.body)
      endpointResponse({
        res,
        message: 'Member created successfuly',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating member] - [members - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateMember(req)
      endpointResponse({
        res,
        message: 'Member updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating member] - [members - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
