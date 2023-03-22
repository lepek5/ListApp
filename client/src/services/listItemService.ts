import axios from "axios";
import { API_BASE_URL } from "../utils/config";

export const createListItem = async (args: any) => {
  try {
    const item = await axios.post(`${API_BASE_URL}/${args.listId}`, args.item);
    return item.data;
  } catch (error: unknown) {    
    return error instanceof Error ? error.message : `Error creating new list`;
  }
};

export const getListItemsById = async (listId: string) => {
  try {
    const item = await axios.get(`${API_BASE_URL}/${listId}`);
    return item;
  } catch (error: unknown) {    
    return error instanceof Error ? error.message : `Error creating new list`;
  }
};

export const deleteListItem = async (args: any) => {
  const item = await axios.delete(`${API_BASE_URL}/${args.listId}/${args.id}`);
  return item.data;
};

export const toggleItemCompleted = async (args: any) => {
  const item = await axios.get(`${API_BASE_URL}/${args.listId}/${args.id}/completed`);
  return item.data;
}