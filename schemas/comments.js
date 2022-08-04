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
  },
}
