const { validationResult } = require('express-validator')
const { ErrorObject } = require('./error')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    next()
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 403)
  }
}

module.exports = { validateResult }
