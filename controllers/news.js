const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  postNew,
  getNewById,
  updateNew,
  deleteNew,
  getNews,
} = require('../services/news')

/**
 * @swagger
 * components:
 *  schemas:
 *    New:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        image:
 *          type: string
 *        type:
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
 *        name: new 1
 *        image: https://image.com/new1.jpg
 *        type: news
 *        createdAt: 2022-08-16T08:30:55.77
 *        updatedAt: 2022-08-16T08:30:55.77
 *        deletedAt: null
 */

/**
 * @swagger
 * /news:
 *  post:
 *    tags: [New]
 *    summary: Create news
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/New'
 *    responses:
 *      200:
 *        description: New created successfuly
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
 *                    type:
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
 *                message: New created successfuly
 *                body:
 *                  id: 1
 *                  name: New 1
 *                  image: https://image.com/new1.jpg
 *                  type: news
 *                  createdAt: 2022-08-16T08:30:55.77
 *                  updatedAt: 2022-08-16T08:30:55.77
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /news/{id}:
 *  put:
 *    tags: [New]
 *    summary: Update newss
 *    parameters:
 *    - in: path
 *      name: id
 *    schema:
 *      type: integer
 *      required: true
 *      description: ID numeric of New to update.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/New'
 *    responses:
 *      200:
 *        description: New updated successfuly
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
 *                    type:
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
 *                message: New updated successfuly
 *                body:
 *                  id: 1
 *                  name: New 1 updated
 *                  image: https://image.com/new1.jpg
 *                  type: news
 *                  createdAt: 2022-08-16T08:30:55.77
 *                  updatedAt: 2022-08-16T08:50:00.71
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      404:
 *        description: New not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /news/{id}:
 *  delete:
 *    tags: [New]
 *    summary: Delete new
 *    parameters:
 *    - in: path
 *      name: id
 *    schema:
 *      type: integer
 *      required: true
 *      description: ID numeric of New to delete.
 *    responses:
 *      200:
 *        description: New successfuly deleted
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
 *                    type:
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
 *                message: New updated successfuly
 *                body:
 *                  id: 1
 *                  name: New 1 updated
 *                  image: https://image.com/new1.jpg
 *                  type: news
 *                  createdAt: 2022-08-16T08:30:55.77
 *                  updatedAt: 2022-08-16T08:30:55.77
 *                  deletedAt: 2022-08-16T09:30:55.77
 *      401:
 *        description: Unauthorized user
 *      403:
 *        description: Token is required
 *      404:
 *        description: New not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /news:
 *  get:
 *    tags: [New]
 *    summary: List of news.
 *    responses:
 *      200:
 *        description: List of news in database.
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
 *                  example: New 1
 *                image:
 *                  type: string
 *                  example: https://image.com/new1.jpg
 *                type:
 *                  type: string
 *                  example: news
 */

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const news = await postNew(req.body)
      endpointResponse({
        res,
        message: 'New created successfully',
        body: news,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating new] - [new - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const news = await getNewById(req.params.id)
      endpointResponse({
        res,
        message: 'New found successfully',
        body: news,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding new] - [new - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateNew(req)
      endpointResponse({
        res,
        message: 'New updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating new] - [news - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteNew(req.params.id)
      endpointResponse({
        res,
        message: 'New deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting new] - [news - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getNews(req.query.page)
      endpointResponse({
        res,
        message: 'News retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving news] - [news - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
