import { getshorturl } from "../dao/short_url.js";
import shorturl from "../models/shorturl.model.js";
import { createshorturlwithoutuser } from "../services/shorturl.services.js";
import { generatenanoid } from "../utils/helper.js";
import { wrapasync } from "../utils/trycatchwrapper.js";

export const createshorturl = wrapasync(async (req, res, next) => {
  const { url } = req.body;
  // const saveshorturl = await createshorturlwithoutuser(url);
  const shorturl = await createshorturlwithoutuser(url);

  res.send(process.env.APP_URL + "" + shorturl);
});

export const redirectfromshorturl = wrapasync(async (req, res) => {
  const { id } = req.params;
  const url = await getshorturl(id);
  if (!url) throw new Error("short url not found");
  res.redirect(url.full_url);
});
