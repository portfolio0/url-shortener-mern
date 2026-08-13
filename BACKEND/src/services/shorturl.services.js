import { generatenanoid } from "../utils/helper.js";
import mongoose from "mongoose";
import urlschema from "../models/shorturl.model.js";
import { saveshorturl } from "../dao/short_url.js";

export const createshorturlwithoutuser = async (url) => {
  const shorturl = generatenanoid(7);
  if (!shorturl) throw new Error("Short URL not generated");
  await saveshorturl(shorturl, url);
  return shorturl;
};

export const createshorturlwithuser = async (url, userid) => {
  const shorturl = await generatenanoid(7);
  await saveshorturl(url, shorturl, userid);
  return shorturl;
};
