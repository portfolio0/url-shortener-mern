import bcrypt from "bcryptjs";
import {
  finduserbyemail,
  finduserbyid,
  createuser,
  updaterefreshtoken,
} from "../dao/user.dao.js";
import {
  generateaccesstoken,
  generaterefreshtoken,
  verifyrefreshtoken,
} from "../utils/jwt.js";
import { conflictError, unauthorizedError } from "../utils/errorhandler.js";

export const signupservice = async (username, email, password) => {
  const existing = await finduserbyemail(email);
  if (existing) throw new conflictError("email already registered");

  const hashedpassword = await bcrypt.hash(password, 10);
  const newuser = await createuser(username, email, hashedpassword);

  const accesstoken = generateaccesstoken({ id: newuser._id });
  const refreshtoken = generaterefreshtoken({ id: newuser._id });
  await updaterefreshtoken(newuser._id, refreshtoken);

  return {
    accesstoken,
    refreshtoken,
    user: { id: newuser._id, username: newuser.username, email: newuser.email },
  };
};

export const loginservice = async (email, password) => {
  const founduser = await finduserbyemail(email);
  if (!founduser) throw new unauthorizedError("invalid email or password");

  const ismatch = await bcrypt.compare(password, founduser.password);
  if (!ismatch) throw new unauthorizedError("invalid email or password");

  const accesstoken = generateaccesstoken({ id: founduser._id });
  const refreshtoken = generaterefreshtoken({ id: founduser._id });
  await updaterefreshtoken(founduser._id, refreshtoken);

  return {
    accesstoken,
    refreshtoken,
    user: {
      id: founduser._id,
      username: founduser.username,
      email: founduser.email,
    },
  };
};

export const refreshservice = async (refreshtoken) => {
  if (!refreshtoken) throw new unauthorizedError("no refresh token");

  let decoded;
  try {
    decoded = verifyrefreshtoken(refreshtoken);
  } catch (err) {
    throw new unauthorizedError("invalid or expired refresh token");
  }

  const founduser = await finduserbyid(decoded.id);
  if (!founduser || founduser.refreshtoken !== refreshtoken) {
    throw new unauthorizedError("refresh token mismatch");
  }

  const accesstoken = generateaccesstoken({ id: founduser._id });
  return { accesstoken };
};

export const logoutservice = async (userid) => {
  if (userid) await updaterefreshtoken(userid, null);
};
