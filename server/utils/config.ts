import dotenv from "dotenv";
dotenv.config();

export default class Config {
  PORT = 4321 || 4000 as number;
  MONGO_URI = process.env.MONGO_URI as string;
  constructor() {
  }
}