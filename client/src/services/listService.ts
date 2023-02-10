import axios from "axios";
import { ListType } from "../types";

const baseUrl = `http://192.168.43.113:4321/`;
const createList = async (args: ListType) => {
  try {
    const list = await axios.post(baseUrl, args);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error creating new list`;
  }
}
const getListById = async (args: string) => {
  try {
    const list = await axios.get(`${baseUrl}${args}`);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error fetching list id ${args}`;
  }
};
const updateListById = async (args: ListType) => {
  try {
    const list = await axios.put(baseUrl+args.listId, args);
    return list.data;
  } catch (error: unknown) {
    return error instanceof Error ? error.message : `Error updating list id ${args.listId}`;
  }
}
export { createList, getListById, updateListById };