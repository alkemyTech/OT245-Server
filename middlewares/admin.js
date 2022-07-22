const createHttpError = require('http-errors')
const { User } = require('../database/models')
// const { Role } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

exports.verifyAdmin = async (req, res, next) => {
  try {
    const { email } = req.user
    const user = await User.findOne({
      where: {
        email,
        roleId: 1,
      },
    })

    if (user) {
      return next()
    }
    throw new ErrorObject('Unauthorized', 401)
  } catch (error) {
    const httpError = createHttpError(501, `[Error User Unauthorized] - [info - GET]: ${error}`)
    return next(httpError)
  }
}
