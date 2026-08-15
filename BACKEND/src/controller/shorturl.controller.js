import { getshorturl } from "../dao/short_url.js";
import {
  createshorturlservice,
  getmyurlsservice,
} from "../services/shorturl.services.js";
import { wrapasync } from "../utils/trycatchwrapper.js";

export const createshorturl = wrapasync(async (req, res) => {
  const { url, customalias } = req.body;
  const userid = req.user ? req.user.id : null;
  const shorturl = await createshorturlservice(url, customalias, userid);
  res.json({ shorturl: process.env.APP_URL + shorturl });
});

export const redirectfromshorturl = wrapasync(async (req, res) => {
  const { id } = req.params;
  const url = await getshorturl(id);
  if (!url) throw new Error("short url not found");
  res.redirect(url.full_url);
});

export const getmyurls = wrapasync(async (req, res) => {
  const urls = await getmyurlsservice(req.user.id);
  res.json({ urls });
});
