import List from "../models/List";
export const updateList = async (id: string, args: any) => {
  try {
    const list = await List.findOneAndUpdate({ listId: id }, args);
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error updating list id ${args.listId}`;
  }
}

export const addListItem = async (id: string, args: any) => {
  try {
    const list = await List.findOneAndUpdate({ listId: id }, {$push: {listItems: args}});
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error updating list id ${args.listId}`;
  }
}

export const getListById = async (args: string) => {
  try {
    const list = await List.findOne({ listId: args });
    await list?.populate("listItems");
    return list;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error fetching list id ${args}`;
  }
}

export const createList = async (args: any) => {
  try {
    const list = await List.create(args);
    list.save();
    return list;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error creating list id ${args.listId}`;
  }
}