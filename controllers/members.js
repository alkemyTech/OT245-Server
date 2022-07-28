const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postMember } = require('../services/members')

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
}
