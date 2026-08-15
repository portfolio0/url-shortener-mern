import urlschema from "../models/shorturl.model.js";
import { conflictError } from "../utils/errorhandler.js";

export const saveshorturl = async (shorturl, fullurl, userid) => {
  try {
    const newurl = new urlschema({
      full_url: fullurl,
      short_url: shorturl,
    });
    if (userid) {
      newurl.user = userid;
    }
    await newurl.save();
    return newurl;
  } catch (err) {
    if (err.code == 11000) {
      throw new conflictError(err);
    }
    throw new Error(err);
  }
};

export const getshorturl = async (shorturl) => {
  return await urlschema.findOneAndUpdate(
    { short_url: shorturl },
    { $inc: { clicks: 1 } },
  );
};

export const checkaliasexists = async (alias) => {
  const found = await urlschema.findOne({ short_url: alias });
  return !!found;
};

export const getuserurls = async (userid) => {
  return await urlschema.find({ user: userid }).sort({ _id: -1 });
};
