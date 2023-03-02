const { checkSchema, validationResult } = require("express-validator");

const dataValidator = (schema) => {
  const validations = checkSchema(schema);

  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({ erros: errors.array() });
  };
};

module.exports = dataValidator;
