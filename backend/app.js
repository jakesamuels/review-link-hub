import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import authRouter from "./routes/authRoutes.js";
import businessProfileRouter from "./routes/businessProfileRoutes.js";
import reviewLinkRouter from "./routes/reviewLinkRoutes.js";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/business-profiles", businessProfileRouter);
app.use("/api/review-links", reviewLinkRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 400));
});

app.use(globalErrorHandler);

export default app;
