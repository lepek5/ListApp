import dotenv from "dotenv";
dotenv.config();

export default class Config {
  PORT = process.env.PORT || 4321 as number;
  MONGO_URI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI as string : process.env.MONGO_URI as string;
  ORIGIN = process.env.NODE_ENV === "production" ? process.env.REMOTE_APP_URL : process.env.LOCAL_APP_URL
  constructor() {
  }
}