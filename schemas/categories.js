exports.category = {
  name: {
    isString: { errorMessage: 'firstName is not a string' },
    exists: {
      errorMessage: 'name cannot be null',
      options: { checkFalsy: true },
    },
  },
}
