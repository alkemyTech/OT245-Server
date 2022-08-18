const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { postTestimonial, updateTestimonial, getAllTestimonials } = require('../services/testimonials')
const { deleteTestimonial } = require('../services/testimonials')

/**
  * @swagger
  * components:
  *  schemas:
  *     Testimonial:
  *       type: object
  *       properties:
  *         id:
  *           type: integer
  *         name:
  *           type: string
  *         image:
  *           type: string
  *         content:
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
  *         name: testimonial name
  *         image: https://someurl.to/a-picture.png
  *         content: some mock content for the testimonial
  *         createdAt: 2022-08-09 19:50:30
  *         updatedAt: 2022-08-09 19:50:30
  *         deletedAt: null
  *
  */

/**
  * @swagger
  *  /testimonials:
  *  post:
  *   summary: create testimonials
  *   tags: [Testimonial]
  *   requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           $ref: '#/components/schemas/Testimonial'
  *   responses:
  *     200:
  *       description: testimonial created successfuly
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
  *                   image:
  *                     type: string
  *                   content:
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
  *               message: testimonial created successfuly
  *               body:
  *                 id: 1
  *                 name: testimonial name
  *                 image: someurl.to/some-image.png
  *                 content: some content
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
  *  /testimonials/{id}:
  *  delete:
  *   summary: create testimonials
  *   tags: [Testimonial]
  *   parameters:
  *     - in: path
  *       name: id
  *       schema:
  *         type: integer
  *       required: true
  *       description: Numeric ID of the testimonial to delete
  *   responses:
  *     200:
  *       description: user deleted successfuly
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
  *               message: testimonial created successfuly
  *               body: 1
  *     401:
  *       description: Unauthorized user
  *     403:
  *       description: Token is required
  *     404:
  *       description: Testimonial not found
  *     500:
  *       description: Internal server error
  */

/**
  * @swagger
  *  /testimonials/{id}:
  *  put:
  *   summary: update testimonials
  *   tags: [Testimonial]
  *   parameters:
  *     - in: path
  *       name: id
  *       schema:
  *         type: integer
  *       required: true
  *       description: Numeric ID of the testimonial to update
  *   requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           type: object
  *           $ref: '#/components/schemas/Testimonial'
  *   responses:
  *     200:
  *       description: testimonial update successfuly
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
  *                   image:
  *                     type: string
  *                   content:
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
  *               message: testimonial updated successfuly
  *               body:
  *                 id: 1
  *                 name: testimonial new name
  *                 image: someurl.to/some-image.png
  *                 content: some new content
  *                 createdAt: 2022-08-09 19:50:30
  *                 updatedAt: 2022-08-09 19:50:30
  *     401:
  *       description: Unauthorized user
  *     403:
  *       description: Token is required
  *     404:
  *       description: Testimonial not found
  *     500:
  *       description: Internal server error
  *
  */

module.exports = {
  getAll: catchAsync(async (req, res, next) => {
    try {
      const response = await getAllTestimonials(req.query.page)
      endpointResponse({
        res,
        message: 'Testimonials obtained successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error obtaining testimonials] - [testimonials - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const response = await postTestimonial(req.body)
      endpointResponse({
        res,
        message: 'Testimonial created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating testimonial] - [testimonials - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteTestimonial(req.params.id)
      endpointResponse({
        res,
        message: 'Testimonial deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting testimonial] - [testimonials - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const response = await updateTestimonial(id, body)
      endpointResponse({
        res,
        message: 'Testimonial updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving info] - [Testimonial - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),

}
