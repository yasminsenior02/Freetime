const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

//create a function to extract jwt from request header
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() == "Bearer") {
      return token;
    }
  }
  return undefined;
};

const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    console.log("Token:", token);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    console.log("error", err);
    return next();
  }
};

const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    console.log("user ", user);
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  jwtFrom,
  extractUserFromJwt,
  requireAuthenticatedUser,
};
// what did you encode as jwt payload
