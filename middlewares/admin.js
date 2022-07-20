const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { Role } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

exports.verifyAdmin = async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await User.findOne({
      where: username,
    })
    const admin = Role.findByPk(user.id)
    if (admin) {
      return next()
    }
    throw new ErrorObject('Unauthorized', 401)
  } catch (error) {
    const httpError = createHttpError(501, `[Error User Unauthorized] - [info - GET]: ${error}`)
    return next(httpError)
  }
}
