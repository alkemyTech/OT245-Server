const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { postActivity, updateActivity } = require('../services/activities')

const post = catchAsync(async (req, res, next) => {
  try {
    const { name, image, content } = req.body
    const response = await postActivity({ name, image, content })
    endpointResponse({
      res,
      message: 'Activity created successfully',
      body: response,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error creating activity] - [activity - POST]: ${error.message}`,
    )
    next(httpError)
  }
})

const put = catchAsync(async (req, res, next) => {
  try {
    const response = await updateActivity(req)
    endpointResponse({
      res,
      message: 'Activity updated successfully',
      body: response,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error updating activity] - [activity - PUT]: ${error.message}`,
    )
    next(httpError)
  }
})

module.exports = { post, put }
