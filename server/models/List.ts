import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  listId: {
    type: String,
    required: true
  },
  listItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListItem"
  }]
});

export default mongoose.model("List", ListSchema);