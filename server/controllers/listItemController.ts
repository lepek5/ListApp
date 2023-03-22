import List from "../models/List";
import ListItem, { MongoListItemType } from "../models/ListItem";
import { sse } from "../sse";
import { ListItemType } from "../types";

export const createListItem = async (listId: string, args: ListItemType) => {
  try {
    const newItem = await ListItem.create(args);
    if (newItem) {
      const list = await List.findOneAndUpdate({ listId }, { $push: { listItems: newItem } })
      sse.send("created id "+newItem._id, listId);
      return newItem;
    } else {
      throw new Error("Controller failed to create new list item.");
    }
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "Error creating new list item.";
  }
}

export const toggleCompleted = async (listId: string, id: string) => {
  const toToggle = await ListItem.findById(id) as MongoListItemType ;
  if (toToggle && toToggle !== undefined) {
    toToggle.completed = !toToggle.completed;
    toToggle.save();
    sse.send(`List Item ${id} toggled`, listId);
    return toToggle;
  } else {
    return "Could not toggle id "+id;
  }
  
}


export const deleteListItem = async (listId: string, id: string) => {
  const deleted = await ListItem.findByIdAndRemove(id);
  const result = await List.findOneAndUpdate({ listId }, { $pull: { listItems: id } });
  if (result !== undefined && result !== null) {
    sse.send("deleted item id "+id, listId);
  }
  return deleted;
}