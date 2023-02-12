import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_DURATION,
  });

  return accessToken;
};

const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { createJWT, isTokenValid };
