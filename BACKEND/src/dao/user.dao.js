import user from "../models/user.model.js";

export const finduserbyemail = async (email) => {
  return await user.findOne({ email });
};

export const finduserbyid = async (id) => {
  return await user.findById(id);
};

export const createuser = async (username, email, hashedpassword) => {
  const newuser = new user({ username, email, password: hashedpassword });
  await newuser.save();
  return newuser;
};

export const updaterefreshtoken = async (userid, refreshtoken) => {
  return await user.findByIdAndUpdate(userid, { refreshtoken });
};
