const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { decodeToken } = require('../middlewares/jwt')
const {
  createUser,
  createLogin,
  deleteUser,
  updateUserById,
  getUserById,
  getAllUsers,
} = require('../services/users')

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    in: header
 *    name: Authorization
 *    description: Bearer token
 *    required: true
 */
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth routes
 */
/**
 * @swagger
 * /auth/register:
 *  post:
 *   tags:
 *   - Auth
 *   summary: Register a new user
 *   description: Register a new user
 *   requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *           required: true
 *          lastName:
 *           type: string
 *           required: true
 *          email:
 *           type: string
 *           required: true
 *           format: email
 *          password:
 *           type: string
 *           required: true
 *           format: password
 *   responses:
 *     '200':
 *      description: User successfuly created
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          status:
 *           type: boolean
 *          message:
 *           type: string
 *          body:
 *           type: object
 *           properties:
 *            userToken:
 *             type: string
 *         example:
 *          status: true
 *          message: User successfuly created
 *          body:
 *           userToker: 546758dr4t342323g
 */
// loggin user
/**
 * @swagger
 * /auth/login:
 *  post:
 *   tags:
 *   - Auth
 *   summary: Login a user
 *   description: Login a user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *         format: email
 *        password:
 *         type: string
 *         format: password
 *   responses:
 *    '200':
 *     description: Login successfully created
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          status:
 *           type: boolean
 *          message:
 *           type: string
 *          body:
 *           type: object
 *           properties:
 *            user:
 *             type: object
 *             properties:
 *              id:
 *               type: string
 *              firstName:
 *               type: string
 *              lastName:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *              createdAt:
 *               type: string
 *              updatedAt:
 *               type: string
 *            token:
 *             type: string
 *             format: jwt
 *        example:
 *         status: true,
 *         message: Login successfully created
 *         body:
 *          user:
 *           id: 1
 *           firstName: Test
 *           lastName: User
 *           email: Test@gmail.com
 *           password: password
 *           createdAt: '2022-04-01T00:00:00.000Z'
 *           updatedAt: '2022-04-01T00:00:00.000Z'
 *          token: 546758dr4t342323g
 */
// Authenticate User
/**
 * @swagger
 * /auth/me:
 *  get:
 *   tags:
 *   - Auth
 *   summary: Get Authorized user
 *   description: Get Authorized user
 *   security:
 *    - bearerAuth: {}
 *   responses:
 *    '200':
 *     description: Authorized user successfully retrieved
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: boolean
 *         message:
 *          type: string
 *         body:
 *          type: object
 *          properties:
 *           user:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 *             firstName:
 *              type: string
 *             lastName:
 *              type: string
 *             email:
 *              type: string
 *             createdAt:
 *              type: string
 *             updatedAt:
 *              type: string
 */

module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const users = await getAllUsers()
      endpointResponse({
        res,
        message: 'Users listed',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error users listed ] - [users - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const response = await createUser(req.body)
      endpointResponse({
        res,
        message: 'User successfuly created',
        body: response,
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

  put: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const updatedUser = await updateUserById(id, body)
      endpointResponse({
        res,
        message: 'User successfuly updated',
        body: updatedUser,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating user] - [user - PUT]: ${error.message}`,
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
