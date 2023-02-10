import List from "../models/List";
import ListItem, { MongoListItemType } from "../models/ListItem";
import { ListItemType } from "../types";

export const createListItem = async (listId: string, args: ListItemType) => {
  try {
    const newItem = await ListItem.create(args);
    if (newItem) {
      const list = await List.findOneAndUpdate({ listId }, { $push: { listItems: newItem } })
      return newItem;
    } else {
      throw new Error("Controller failed to create new list item.");
    }
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "Error creating new list item.";
  }
}

export const toggleCompleted = async (id: string) => {
  console.log("trying to toggle")
  const toToggle = await ListItem.findById(id) as MongoListItemType ;
  if (toToggle && toToggle !== undefined) {
    toToggle.completed = !toToggle.completed;
    toToggle.save();
    console.log("found")
    return toToggle;
  } else {
    return "Could not toggle id "+id;
  }
  
}


export const deleteListItem = async (listId: string, id: string) => {
  const deleted = await ListItem.findByIdAndRemove(id);
  await List.findOneAndUpdate({ listId }, { $pull: { listItems: id } });
  return deleted;
}