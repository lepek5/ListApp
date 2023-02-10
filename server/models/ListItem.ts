import mongoose from "mongoose";
import { ListItemType } from "../types";

export type MongoListItemType = mongoose.Document & ListItemType;

const ListItemSchema = new mongoose.Schema<MongoListItemType>({
  text: {
    type: String,
    required: true
  },
  completed: Boolean
});

export default mongoose.model<MongoListItemType>("ListItem", ListItemSchema);