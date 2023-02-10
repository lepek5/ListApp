import axios from "axios";
const baseUrl = "http://192.168.43.113:4321";

export const createListItem = async (args: any) => {
  try {
    const item = await axios.post(`${baseUrl}/${args.listId}`, args.item);
    return item.data;
  } catch (error: unknown) {    
    return error instanceof Error ? error.message : `Error creating new list`;
  }
};

export const getListItemsById = async (listId: string) => {
  try {
    const item = await axios.get(`${baseUrl}/${listId}`);
    return item;
  } catch (error: unknown) {    
    return error instanceof Error ? error.message : `Error creating new list`;
  }
};

export const deleteListItem = async (args: any) => {
  const item = await axios.delete(`${baseUrl}/${args.listId}/${args.id}`);
  return item.data;
};

export const toggleItemCompleted = async (args: any) => {
  const item = await axios.get(`${baseUrl}/${args.listId}/${args.id}/completed`);
  return item.data;
}