const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createUser, getUserByEmail, getPassword } = require('../services/users')

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

  createLogin: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await getUserByEmail(email)
      if (user) {
        if (getPassword(password, user.password)) {
          endpointResponse({
            res,
            message: 'Login successfuly created',
            body: user,
          })
        } else {
          endpointResponse({
            res,
            status: false,
            code: 403,
            message: '{ok: false}',
            body: null,
          })
        }
      } else {
        endpointResponse({
          res,
          status: false,
          code: 403,
          message: '{ok: false}',
          body: null,
        })
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving login] - [user- login]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
