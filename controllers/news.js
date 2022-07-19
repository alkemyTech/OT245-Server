const createHttpError = require("http-errors");
const { endpointResponseCreated } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { postNew } = require("../services/news");

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const news = await postNew(req.body);
      endpointResponseCreated({
        res,
        message: "New created successfully",
        body: news,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating new] - [new - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
