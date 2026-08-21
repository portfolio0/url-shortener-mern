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

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. mobile apps, postman, curl)
      if (!origin) return callback(null, true);
      
      const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : null;
      const cleanOrigin = origin.replace(/\/$/, "");
      
      if (
        !clientUrl ||
        cleanOrigin === clientUrl ||
        cleanOrigin === "http://localhost:5173" ||
        cleanOrigin === "http://localhost:3000" ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const PORT = process.env.PORT || 3000;

app.use("/api/create", shorturlroute);
app.use("/api/auth", authroute);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running",
  });
});

// Example:
// https://your-backend.onrender.com/abc123

app.get("/:id", redirectfromshorturl);

// Must remain after all routes
app.use(errorhandler);

const startServer = async () => {
  try {
    await connectdb();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    process.exit(1);
  }
};

startServer();
