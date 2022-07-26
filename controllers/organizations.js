const createHttpError = require('http-errors')
const { getOrganizations, updateOrganization } = require('../services/organizations')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getOrganizations()
      endpointResponse({
        res,
        message: 'Organization information',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving info] - [organization - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateOrganization(req)
      endpointResponse({
        res,
        message: 'Organization updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving info] - [organization - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
