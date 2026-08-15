import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import connectdb from "./src/config/mongo.config.js";
import shorturlroute from "./src/routes/shorturl.route.js";
import authroute from "./src/routes/auth.route.js";
import { redirectfromshorturl } from "./src/controller/shorturl.controller.js";
import { errorhandler } from "./src/utils/errorhandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const PORT = process.env.PORT || 3000;

app.use("/api/create", shorturlroute);
app.use("/api/auth", authroute);

app.get("/:id", redirectfromshorturl);

// error handler must stay last
app.use(errorhandler);

app.listen(PORT, () => {
  connectdb();
  console.log(`server listen on ${process.env.PORT}...`);
});

console.log("running!!");