import express from "express";
import {
  createshorturl,
  getmyurls,
} from "../controller/shorturl.controller.js";
import { optionalauth, requireauth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", optionalauth, createshorturl);
router.get("/myurls", requireauth, getmyurls);

export default router;
