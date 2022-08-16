const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  postMember, updateMember, deleteMember, getMembers,
} = require('../services/members')

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
      const { id } = req.params
      const { body } = req
      const response = await updateMember(id, body)
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
      const members = await getMembers(req.query.page)
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
