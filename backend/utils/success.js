const endpointResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
  options,
}) => {
  res.status(code).json({ status, code, message, body, options });
};

export default endpointResponse;
