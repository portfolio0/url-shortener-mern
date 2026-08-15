import jwt from "jsonwebtoken";

export const generateaccesstoken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generaterefreshtoken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyaccesstoken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyrefreshtoken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
