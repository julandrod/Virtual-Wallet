const errorHandlerMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || err;
  res.status(status).json({ message });
};

export default errorHandlerMiddleware;
