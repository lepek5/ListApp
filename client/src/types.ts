export type ListType = {
  _id?: string;
  listId: string;
  listItems: string[];
}

export type ListItemType = {
  _id?: string;
  text: string;
  completed: boolean;
};