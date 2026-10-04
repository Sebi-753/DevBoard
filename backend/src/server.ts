import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

connectDB();

// Security headers
app.use(helmet());

// Allow requests from Next.js frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//If no response til now, the route is not defined
app.use(notFound);

// if next(err) to any other middeware
app.use(errorHandler);
