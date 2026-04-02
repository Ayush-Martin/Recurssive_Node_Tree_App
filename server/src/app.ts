import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "./shared/configs/cors";
import morgan from "morgan";
import apiRouter from "./presentation/routes/api/index";
import nocache from "nocache";
import { errorHandlerMiddleware } from "./infrastructure/container/DI";

class App {
  public app: Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(cors);
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(nocache());
    this.app.use("/api", apiRouter);
    this.app.use(errorHandlerMiddleware.handle);
  }
}

export default App;