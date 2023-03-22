import axios from "axios";
import { ListType } from "../types";
import { API_BASE_URL } from "../utils/config";
const createList = async (args: ListType) => {
  try {
    const list = await axios.post(API_BASE_URL, args);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error creating new list`;
  }
}
const getListById = async (args: string) => {
  try {
    const list = await axios.get(`${API_BASE_URL}/${args}`);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error fetching list id ${args}`;
  }
};
const updateListById = async (args: ListType) => {
  try {
    const list = await axios.put(API_BASE_URL+"/"+args.listId, args);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error updating list id ${args.listId}`;
  }
}
export { createList, getListById, updateListById };