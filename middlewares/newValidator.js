const { checkSchema, validationResult } = require('express-validator')

module.exports.schemaValidator = (schema) => [
  checkSchema(schema),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      return res.status(400).json({ error: error.array() })
    }
  },
]
