const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createUser, createLogin } = require('../services/users')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const user = await createUser(req.body)
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

  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await createLogin(email, password)
      if (user) {
        endpointResponse({
          res,
          message: 'Login successfuly created',
          body: user,
        })
      }
      endpointResponse({
        res,
        status: false,
        code: 403,
        message: '{ok: false}',
        body: null,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving login] - [user- login]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
