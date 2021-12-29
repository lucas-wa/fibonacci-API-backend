import "express-async-errors";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // Verifica se é um erro tratado pela aplicação
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message
      });
    }

    // Se não é tratado
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running");
});
