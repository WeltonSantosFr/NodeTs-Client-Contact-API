import express from "express";
import { appRoutes } from "./routes";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
appRoutes(app);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
