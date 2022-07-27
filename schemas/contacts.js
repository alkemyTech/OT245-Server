exports.contactRegister = {
  name: {
    exists: {
      errorMessage: 'name cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'name is not a string' },
  },
  email: {
    exists: {
      errorMessage: 'email cannot be null',
      options: { checkFalsy: true },
    },
    isEmail: { errorMessage: 'invalid email' },
    isString: { errorMessage: 'email is not a string' },
  },
}
