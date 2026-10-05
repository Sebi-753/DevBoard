import cookieParser from "cookie-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";
import taskRouter from "./routes/taskRoute.js";
import commentRouter from "./routes/commentRoute.js";
import authRouter from "./routes/authRoute.js";

export const app = express();

dotenv.config();
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

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/auth", authRouter);

//If no response til now, the route is not defined
app.use(notFound);

// if next(err) to any other middeware
app.use(errorHandler);
