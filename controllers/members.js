const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  postMember, updateMember, deleteMember, getMembers,
} = require('../services/members')

/**
 * @swagger
 * components:
 *  schemas:
 *    Member:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        image:
 *          type: string
 *        createdAt:
 *          type: integer
 *          format: date
 *        updatedAt:
 *          type: integer
 *          format: date
 *        deletedAt:
 *          type: integer
 *          format: date
 *      example:
 *        name: member 1
 *        image: https://image.com/member1.jpg
 *        createdAt: 2022-08-10T12:30:55.77
 *        updatedAt: 2022-08-10T12:30:55.77
 *        deletedAt: null
 */

/**
 * @swagger
 * /members:
 *  post:
 *    tags: [Member]
 *    summary: Create members
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Member'
 *    responses:
 *      200:
 *        description: Member created successfuly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                code:
 *                  type: integer
 *                message:
 *                  type: string
 *                body:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    image:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    deletedAt:
 *                      type: string
 *                      format: date-time
 *              example:
 *                status: true
 *                code: 200
 *                message: Member created successfuly
 *                body:
 *                  id: 1
 *                  name: Member 1
 *                  image: https://image.com/member1.jpg
 *                  createdAt: 2022-08-10T12:30:55.77
 *                  updatedAt: 2022-08-10T12:30:55.77
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /members/{id}:
 *  put:
 *    tags: [Member]
 *    summary: Update members
 *    parameters:
 *    - in: path
 *      name: id
 *    schema:
 *      type: integer
 *      required: true
 *      description: ID numeric of Member to update.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Member'
 *    responses:
 *      200:
 *        description: Member updated successfuly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                code:
 *                  type: integer
 *                message:
 *                  type: string
 *                body:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    image:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    deletedAt:
 *                      type: string
 *                      format: date-time
 *              example:
 *                status: true
 *                code: 200
 *                message: Member updated successfuly
 *                body:
 *                  id: 1
 *                  name: Member 1 updated
 *                  image: https://image.com/member1.jpg
 *                  createdAt: 2022-08-10T12:30:55.77
 *                  updatedAt: 2022-08-10T12:30:55.77
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      404:
 *        description: Member not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /members/{id}:
 *  delete:
 *    tags: [Member]
 *    summary: Delete member
 *    parameters:
 *    - in: path
 *      name: id
 *    schema:
 *      type: integer
 *      required: true
 *      description: ID numeric of Member to delete.
 *    responses:
 *      200:
 *        description: Member successfuly deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                code:
 *                  type: integer
 *                message:
 *                  type: string
 *                body:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    image:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    deletedAt:
 *                      type: string
 *                      format: date-time
 *              example:
 *                status: true
 *                code: 200
 *                message: Member updated successfuly
 *                body:
 *                  id: 1
 *                  name: Member 1 updated
 *                  image: https://image.com/member1.jpg
 *                  createdAt: 2022-08-10T12:30:55.77
 *                  updatedAt: 2022-08-10T12:30:55.77
 *                  deletedAt: 2022-08-10T12:30:55.77
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      404:
 *        description: Member not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /members:
 *  get:
 *    tags: [Member]
 *    summary: List of members.
 *    responses:
 *      200:
 *        description: List of members in database.
 *        content:
 *          application/json:
 *            schema:
 *            type: array
 *            items:
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: Member 1
 *                image:
 *                  type: string
 *                  example: https://image.com/member1.jpg
 */

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

  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const member = await deleteMember(id)
      endpointResponse({
        res,
        message: 'User successfuly deleted',
        body: member,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting member] - [member - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  get: catchAsync(async (req, res, next) => {
    try {
      const members = await getMembers()
      endpointResponse({
        res,
        message: 'Members retrieved successfully',
        body: members,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving members] - [members - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
