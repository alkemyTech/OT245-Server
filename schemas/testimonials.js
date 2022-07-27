exports.postTestimonial = {
  name: {
    exists: {
      errorMessage: 'name cannot be null',
      options: { checkFalsy: true },
    },
  },
  content: {
    exists: {
      errorMessage: 'content cannot be null',
      options: { checkFalsy: true },
    },
  },
}
