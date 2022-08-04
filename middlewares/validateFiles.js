const { ErrorObject } = require('../helpers/error')

module.exports.validateFiles = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ErrorObject('There are no files to upload', 400)
  }
  return next()
}
