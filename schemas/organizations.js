exports.organization = {
  name: {
    exists: {
      errorMessage: 'Name cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'Name must be an string' },
  },
  image: {
    exists: {
      errorMessage: 'Image cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'Image must be an string' },
  },
  address: {
    isString: { errorMessage: 'Address must be an string' },
  },
  phone: {
    isInt: { errorMessage: 'Invalid values' },
    isMobilePhone: { errorMessage: 'Please, enter an valid phone number' },
  },
  email: {
    exists: {
      errorMessage: 'Email cannot be null',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'Email must be an string' },
    isEmail: { errorMessage: 'Please, enter an valid email' },
  },
  welcomeText: {
    exists: {
      errorMessage: 'welcome Text cannot be null',
      options: { checkFalsy: true },
    },
  },
  aboutUsText: {
    exists: {
      errorMessage: 'About Us text cannot be null',
      options: { checkFalsy: true },
    },
  },

}
