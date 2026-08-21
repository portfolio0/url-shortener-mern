import { getshorturl } from "../dao/short_url.js";
import {
  createshorturlservice,
  getmyurlsservice,
} from "../services/shorturl.services.js";
import { wrapasync } from "../utils/trycatchwrapper.js";
import { NotFoundError } from "../utils/errorhandler.js";

export const createshorturl = wrapasync(async (req, res) => {
  const { url, customalias } = req.body;
  const userid = req.user ? req.user.id : null;
  const shorturl = await createshorturlservice(url, customalias, userid);
  const baseUrl = (process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, "");
  res.json({ shorturl: `${baseUrl}/${shorturl}` });
});

export const redirectfromshorturl = wrapasync(async (req, res) => {
  const { id } = req.params;
  const url = await getshorturl(id);
  if (!url) throw new NotFoundError("Short URL not found");
  
  let targetUrl = url.full_url;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }
  res.redirect(targetUrl);
});

export const getmyurls = wrapasync(async (req, res) => {
  const urls = await getmyurlsservice(req.user.id);
  res.json({ urls });
});
