const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { decodeToken } = require('../middlewares/jwt')
const {
  createUser,
  createLogin,
  deleteUser,
  getUserById,
} = require('../services/users')

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
      } else {
        throw new ErrorObject('{ok: false}', 403)
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [auth - login]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await deleteUser(id)
      endpointResponse({
        res,
        message: 'User successfuly deleted',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [user - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getUserByToken: catchAsync(async (req, res, next) => {
    try {
      const { user } = await decodeToken(req.headers.authorization)
      const response = await getUserById(user.id)
      endpointResponse({
        res,
        message: 'Authorized user successfuly retrieved',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error fetching user data] - [auth - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
