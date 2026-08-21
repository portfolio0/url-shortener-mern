import jwt from "jsonwebtoken";
import {
  signupservice,
  loginservice,
  refreshservice,
  logoutservice,
} from "../services/auth.services.js";
import { finduserbyid } from "../dao/user.dao.js";
import { wrapasync } from "../utils/trycatchwrapper.js";

const isProduction = process.env.NODE_ENV === "production";

const refreshcookieoptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signup = wrapasync(async (req, res) => {
  const { username, email, password } = req.body;
  const { accesstoken, refreshtoken, user } = await signupservice(
    username,
    email,
    password,
  );
  res.cookie("refreshtoken", refreshtoken, refreshcookieoptions);
  res.json({ accesstoken, user });
});

export const login = wrapasync(async (req, res) => {
  const { email, password } = req.body;
  const { accesstoken, refreshtoken, user } = await loginservice(
    email,
    password,
  );
  res.cookie("refreshtoken", refreshtoken, refreshcookieoptions);
  res.json({ accesstoken, user });
});

export const refresh = wrapasync(async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  const { accesstoken } = await refreshservice(refreshtoken);
  res.json({ accesstoken });
});

export const me = wrapasync(async (req, res) => {
  const founduser = await finduserbyid(req.user.id);
  res.json({
    user: {
      id: founduser._id,
      username: founduser.username,
      email: founduser.email,
    },
  });
});

export const logout = wrapasync(async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  if (refreshtoken) {
    const decoded = jwt.decode(refreshtoken);
    if (decoded?.id) await logoutservice(decoded.id);
  }
  res.clearCookie("refreshtoken", refreshcookieoptions);
  res.json({ success: true });
});
