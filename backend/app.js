import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const app = express();

app.use(express.json());
express.urlencoded({ extended: true });

app.use("/api/auth", authRouter);

export default app;
