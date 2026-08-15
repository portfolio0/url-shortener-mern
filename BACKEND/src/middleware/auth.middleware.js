import { verifyaccesstoken } from "../utils/jwt.js";
import { unauthorizedError } from "../utils/errorhandler.js";

export const requireauth = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return next(new unauthorizedError("no token provided"));
  }
  const token = authheader.split(" ")[1];
  try {
    const decoded = verifyaccesstoken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new unauthorizedError("invalid or expired token"));
  }
};

export const optionalauth = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (authheader && authheader.startsWith("Bearer ")) {
    const token = authheader.split(" ")[1];
    try {
      req.user = verifyaccesstoken(token);
    } catch (err) {
      // bad/expired token, treat as guest
    }
  }
  next();
};
