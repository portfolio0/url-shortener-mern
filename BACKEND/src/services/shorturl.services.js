import { generatenanoid } from "../utils/helper.js";
import {
  saveshorturl,
  checkaliasexists,
  getuserurls,
} from "../dao/short_url.js";
import { AppError, conflictError } from "../utils/errorhandler.js";

export const createshorturlservice = async (url, customalias, userid) => {
  if (!url) throw new AppError("url required", 400);

  let shorturl;
  if (customalias) {
    const exists = await checkaliasexists(customalias);
    if (exists) throw new conflictError("custom alias already taken");
    shorturl = customalias;
  } else {
    shorturl = generatenanoid(7);
  }

  if (!shorturl) throw new Error("Short URL not generated");
  await saveshorturl(shorturl, url, userid);
  return shorturl;
};

export const getmyurlsservice = async (userid) => {
  return await getuserurls(userid);
};
