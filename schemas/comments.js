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
      errorMessage: 'user_id cannot be null',
    },
    notEmpty: {
      errorMessage: 'user_id is empty',
    },
    isInt: {
      errorMessage: 'The User_id must be a integer',
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
      errorMessage: 'new_id cannot be null',
    },
    notEmpty: {
      errorMessage: 'new_id is empty',
    },
    isInt: {
      errorMessage: 'The new_id must be a integer',
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
