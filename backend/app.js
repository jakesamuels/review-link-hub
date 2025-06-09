import express from "express";
import cors from "cors";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
express.urlencoded({ extended: true });

app.use("/api/auth", authRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 400));
});

app.use(globalErrorHandler);

export default app;
