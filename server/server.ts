import Config from "./utils/config";
import Database from "./utils/database";
import express from "express";
import cors from "cors";
// @ts-ignore
import compression from "compression";
import { ListRequestFormatter } from "./middleware";
import ListRouter from "./routes";
import { listItemRouter } from "./routes/listItem";
import { sseRouter } from "./routes/sse";

export default class Server {
  config;
  database;
  app;
  constructor() {
    this.config = new Config();
    this.database = new Database(this.config.MONGO_URI);
    this.app = express();
  }
  initialize() {
    this.database.Connect();
    this.app.use(compression())
    this.app.use(cors({ origin: this.config.ORIGIN, credentials: true }));
    this.app.use(express.json());
    this.app.use(ListRequestFormatter);
    this.app.use(sseRouter);
    this.app.use(ListRouter);
    this.app.use(listItemRouter);
  }
  start() {
    this.initialize();
    this.app.listen(this.config.PORT, () => {
      console.log(`Express is running at ${this.config.PORT}`)
    })
  }
};
