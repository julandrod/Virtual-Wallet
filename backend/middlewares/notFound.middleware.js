import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../utils/index.js";

const notFoundMiddleware = (req, res, next) => {
  return next(
    createCustomError("No se encontro la pagina", StatusCodes.NOT_FOUND)
  );
};

export default notFoundMiddleware;
