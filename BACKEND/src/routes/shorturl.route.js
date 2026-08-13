import express, { Router } from "express";
import { nanoid } from "nanoid";
import { createshorturl } from "../controller/shorturl.controller.js";
const router = express.Router();

router.post("/", createshorturl);

export default router;

/*
 (req, res) => {
  const { url } = req.body;
  const shorturl = nanoid(7);
  const newurl = new urlschema({
    full_url: url,
    short_url: shorturl,
  });
*/
