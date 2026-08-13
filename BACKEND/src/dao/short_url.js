import shorturl from "../models/shorturl.model.js";
import urlschema from "../models/shorturl.model.js";
import { conflictError } from "../utils/errorhandler.js";
export const saveshorturl = async (shorturl, fullurl, userid) => {
  try {
    const newurl = new urlschema({
      full_url: fullurl,
      short_url: shorturl,
    });
    if (userid) {
      newurl.userid = userid;
    }
    await newurl.save();
    return newurl;
  } catch (err) {
    // console.log(err);
    if (err.code == 11000) {
      throw new conflictError(err);
    }
    throw new Error(err);
  }
};

export const getshorturl = async (shorturl) => {
  return await urlschema.findOneAndUpdate(
    { short_url: shorturl },
    { $inc: { clicks: 1 } }
  );
};
