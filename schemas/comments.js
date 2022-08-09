const { User, New } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

module.exports.comment = {
  body: {
    exists: {
      errorMessage: 'body cannot be null',
    },
    notEmpty: {
      errorMessage: 'body is empty',
    },
    isString: {
      errorMessage: 'The body must be a integer',
    },
  },
  userId: {
    exists: {
      errorMessage: 'userId cannot be null',
    },
    notEmpty: {
      errorMessage: 'userId is empty',
    },
    isInt: {
      errorMessage: 'The userId must be a integer',
    },
    custom: {
      options: async (userId) => {
        const commentUser = await User.findByPk(userId)
        if (!commentUser) {
          throw new ErrorObject('UserId not Found', 400)
        }
        return userId
      },
    },
  },
  newId: {
    exists: {
      errorMessage: 'newId cannot be null',
    },
    notEmpty: {
      errorMessage: 'newId is empty',
    },
    isInt: {
      errorMessage: 'The newId must be a integer',
    },
    custom: {
      options: async (newId) => {
        const commentNew = await New.findByPk(newId)
        if (!commentNew) {
          throw new ErrorObject('NewId not Found', 400)
        }
        return newId
      },
    },
  },
}
