exports.postMember = {
  name: {
    exists: {
      errorMessage: 'name cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'name is not a string' },
  },
}
