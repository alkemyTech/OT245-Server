const createHttpError = require('http-errors')
const { checkSchema, validationResult } = require('express-validator')

exports.schemaValidator = (schema) => [
  checkSchema(schema),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      const errors = error.array().map((err) => err.msg)
      const httpError = createHttpError(
        400,
        `[Error on data validation] - [${(req.baseUrl).slice(1)} - ${req.method}]: ${errors}`,
      )
      return next(httpError)
    }
  },
]
