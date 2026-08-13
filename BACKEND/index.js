import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import connectdb from "./src/config/mongo.config.js";
import urlschema from "./src/models/shorturl.model.js";
import shorturl from "./src/routes/shorturl.route.js";
import { redirectfromshorturl } from "./src/controller/shorturl.controller.js";
import { errorhandler } from "./src/utils/errorhandler.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/api/create", shorturl);
app.use(errorhandler);

app.get("/:id", redirectfromshorturl);
//    async (req, res) => {
//   const { id } = req.params;
//   const url = await urlschema.findOne({ short_url: id });
//   if (url) {
//     res.redirect(url.full_url);
//   } else {
//     res.status(404).send("Not Found");
//   }
// });

app.listen(PORT, () => {
  connectdb();
  console.log(`server listen on ${process.env.PORT}...`);
});

console.log("running!!");
