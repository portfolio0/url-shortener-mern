import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully ✅🚀");
  } catch (error) {
    console.error("error failed to connect database", error);
    process.exit(1);
  }
};

export default connectdb;
