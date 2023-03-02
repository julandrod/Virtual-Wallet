const errorHandler = (err, req, res, next) => {
  let code = err.statusCode || 500;
  let message = err.message || err;

  // if (err.errors.length > 0) {
  //   message = Object.values(err.errors)
  //     .map((item) => item.message)
  //     .join(", ");
  //   code = 400;
  // }

  res.status(code).json({ message });
};

module.exports = errorHandler;
