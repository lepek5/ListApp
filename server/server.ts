import Config from "./utils/config";
import Database from "./utils/database";
import express from "express";
import cors from "cors";
import { ListRequestFormatter } from "./middleware";
import ListRouter from "./routes";
import { listItemRouter } from "./routes/listItem";

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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(ListRequestFormatter);
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