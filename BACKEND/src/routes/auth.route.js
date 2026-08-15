import express from "express";
import {
  signup,
  login,
  refresh,
  me,
  logout,
} from "../controller/auth.controller.js";
import { requireauth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", requireauth, me);
router.post("/logout", logout);

export default router;
