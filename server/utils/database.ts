import mongoose from "mongoose";
export default class Database {
  database_uri;

  constructor(database_uri: string) {
    this.database_uri = database_uri;
    
  }
  Connect(){
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(this.database_uri);
      console.log(`Database connection to MongoDB established`);
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : `Error connecting to mongo database`);
    }
  }
}