const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { registUser } = require('../services/users')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const user = await registUser(req.body)
      endpointResponse({
        res,
        message: 'User successfuly created',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [auth - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
