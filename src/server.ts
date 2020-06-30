import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import path from "path";
import AppError from "./errors/AppError";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

// Global error handler
app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    console.error("uncaught error: ", err);

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3333, () => {
  console.log("server running on port 3333 🤘");
});
