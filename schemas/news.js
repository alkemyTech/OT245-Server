module.exports.news = {
  name: {
    exists: {
      errorMessage: "name cannot be null",
      options: { checkFalsy: true },
    },
  },
  content: {
    exists: {
      errorMessage: "content cannot be null",
      options: { checkFalsy: true },
    },
  },
  image: {
    exists: {
      errorMessage: "Image cannot be null",
      options: { checkFalsy: true },
    },
  },
};
