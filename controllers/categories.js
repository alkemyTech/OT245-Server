const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  getCategories,
  getCategoryById,
  updateCategory,
  postCategory,
  deleteCategory,
} = require('../services/categories')

/**
  * @swagger
  * components:
  *  schemas:
  *     Category:
  *       type: object
  *       properties:
  *         id:
  *           type: integer
  *         name:
  *           type: string
  *         description:
  *           type: string
  *         image:
  *           type: string
  *         createdAt:
  *           type: integer
  *           format: date
  *         updatedAt:
  *           type: integer
  *           format: date
  *         deletedAt:
  *           type: integer
  *           format: date
  *       example:
  *         name: category name
  *         description: some description
  *         image: https://someurl.to/a-picture.png
  *         createdAt: 2022-08-09 19:50:30
  *         updatedAt: 2022-08-09 19:50:30
  *         deletedAt: null
  *
  */

/**
  * @swagger
  *  /categories:
  *  post:
  *   summary: create categories
  *   tags: [Category]
  *   requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           $ref: '#/components/schemas/Category'
  *   responses:
  *     200:
  *       description: category created successfuly
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               status:
  *                 type: boolean
  *               code:
  *                 type: integer
  *               message:
  *                 type: string
  *               body:
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: integer
  *                   name:
  *                     type: string
  *                   description:
  *                     type: string
  *                   image:
  *                     type: string
  *                   createdAt:
  *                     type: string
  *                     format: date-time
  *                   updatedAt:
  *                     type: string
  *                     format: date-time
  *                   deletedAt:
  *                     type: string
  *                     format: date-time
  *             example:
  *               status: true
  *               code: 200
  *               message: category created successfuly
  *               body:
  *                 id: 1
  *                 name: category name
  *                 description: some description
  *                 image: someurl.to/some-image.png
  *                 createdAt: 2022-08-09 19:50:30
  *                 updatedAt: 2022-08-09 19:50:30
  *     401:
  *       description: Unauthorized user
  *     403:
  *       description: Token is required
  *     500:
  *       description: Internal server error
  *
  */

/**
  * @swagger
  *  /categories/{id}:
  *  delete:
  *   summary: create categories
  *   tags: [Category]
  *   parameters:
  *     - in: path
  *       name: id
  *       schema:
  *         type: integer
  *       required: true
  *       description: Numeric ID of the category to delete
  *   responses:
  *     200:
  *       description: category deleted successfuly
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               status:
  *                 type: boolean
  *               code:
  *                 type: integer
  *               message:
  *                 type: string
  *               body:
  *                 type: array
  *                 items:
  *                   type: integer
  *             example:
  *               status: true
  *               code: 200
  *               message: category deleted successfuly
  *               body: 1
  *     401:
  *       description: Unauthorized user
  *     403:
  *       description: Token is required
  *     404:
  *       description: Category not found
  *     500:
  *       description: Internal server error
  */

/**
  * @swagger
  *  /categories/{id}:
  *  put:
  *   summary: update categories
  *   tags: [Category]
  *   parameters:
  *     - in: path
  *       name: id
  *       schema:
  *         type: integer
  *       required: true
  *       description: Numeric ID of the category to update
  *   requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           $ref: '#/components/schemas/Category'
  *   responses:
  *     200:
  *       description: category update successfuly
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               status:
  *                 type: boolean
  *               code:
  *                 type: integer
  *               message:
  *                 type: string
  *               body:
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: integer
  *                   name:
  *                     type: string
  *                   description:
  *                     type: string
  *                   image:
  *                     type: string
  *                   createdAt:
  *                     type: string
  *                     format: date-time
  *                   updatedAt:
  *                     type: string
  *                     format: date-time
  *                   deletedAt:
  *                     type: string
  *                     format: date-time
  *             example:
  *               status: true
  *               code: 200
  *               message: category updated successfuly
  *               body:
  *                 id: 1
  *                 name: category new name
  *                 description: some description
  *                 image: someurl.to/some-image.png
  *                 createdAt: 2022-08-09 19:50:30
  *                 updatedAt: 2022-08-09 19:50:30
  *     401:
  *       description: Unauthorized user
  *     403:
  *       description: Token is required
  *     404:
  *       description: Category not found
  *     500:
  *       description: Internal server error
  *
  */

/**
 * @swagger
 * /category:
 *  get:
 *    tags: [Category]
 *    summary: List of categories.
 *    responses:
 *      200:
 *        description: List of categories in database.
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
 *                  example: category name
 *                description:
 *                  type: string
 *                  example: some description
 *                image:
 *                  type: string
 *                  example: https://image.com/category1.jpg
 */

/**
  * @swagger
  * /categories/{id}:
  *  get:
  *   tags: [Category]
  *   summary: get a category detail categories
  *   parameters:
  *     - in: path
  *       name: id
  *       schema:
  *         type: integer
  *       required: true
  *       description: Numeric ID of the category to search
  *   responses:
  *    200:
  *     description: category detail successfuly
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           properties:
  *             status:
  *               type: boolean
  *             code:
  *               type: integer
  *             message:
  *               type: string
  *             body:
  *               type: object
  *               properties:
  *                 id:
  *                   type: integer
  *                 name:
  *                   type: string
  *                 description:
  *                   type: string
  *                 image:
  *                   type: string
  *                 createdAt:
  *                   type: string
  *                   format: date-time
  *                 updatedAt:
  *                   type: string
  *                   format: date-time
  *                 deletedAt:
  *                   type: string
  *                   format: date-time
  *           example:
  *             status: true
  *             code: 200
  *             message: category detail successfuly
  *             body:
  *               id: 1
  *               name: category name
  *               description: some description
  *               image: someurl.to/some-image.png
  *               createdAt: 2022-08-09 19:50:30
  *               updatedAt: 2022-08-09 19:50:30
  *
*/

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const categories = await getCategories(req.query.page)
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
        body: categories,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving categories] - [categories - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getCategoryById: catchAsync(async (req, res, next) => {
    try {
      const category = await getCategoryById(req.params.id)
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
        body: category,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [category - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const updatedCategory = await updateCategory(req)
      endpointResponse({
        res,
        message: 'Category updated successfully',
        body: updatedCategory,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating category] - [categories - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description, image } = req.body
      const response = await postCategory({ name, description, image })
      endpointResponse({
        res,
        message: 'Category created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating category] - [Category - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteCategory(req.params.id)
      endpointResponse({
        res,
        message: 'category deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting category] - [categories - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
