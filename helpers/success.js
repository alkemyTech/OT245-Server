const endpointResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
  options,
}) => {
  res.status(code).json({
    status,
    code,
    message,
    body,
    options,
  });
};

const endpointResponseCreated = ({
  res,
  code = 201,
  status = true,
  message,
  body,
  options,
}) => {
  res.status(code).json({
    status,
    code,
    message,
    body,
    options,
  });
};

module.exports = {
  endpointResponse,
  endpointResponseCreated,
};
