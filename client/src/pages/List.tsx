import { useParams } from "react-router-dom";
import AddNewListItem from "../components/AddNewListItem";
import ListItems from "../components/ListItems";
import { getListById, } from "../services/listService";
import { createListItem, deleteListItem, toggleItemCompleted } from "../services/listItemService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/config";

const List = () => {
  const whatsAppShareString = `Here's a List i want to share with you: ${document.URL}`;
  const { id } = useParams<{ id: string }>();
  const list = useQuery("list", async () => await getListById(id as string));
  const itemQueryClient = useQueryClient();

  useEffect(() => {
    const events = new EventSource(`${API_BASE_URL}/stream`);
    if (events !== null && events !== undefined) {
      events.onopen = () => {
        events.addEventListener(id as string, async (event) => {
          await itemQueryClient.invalidateQueries("list");
        })
      }
      events.onerror = () => console.log("Error with SSE!");
    }
  }, []);



  const Completed = useMutation(toggleItemCompleted, {
    onSuccess: async () => await itemQueryClient.invalidateQueries("list")
  });
  const newItem = useMutation(createListItem, {
    onSuccess: async () => {
      await itemQueryClient.invalidateQueries("list");
    },
  });
  const deleteItem = useMutation(deleteListItem, {
    onSuccess: () => {
      itemQueryClient.invalidateQueries("list");
    }
  });
  const handleToggleCompleted = async (itemId: string) => {
    try {
      const item = {
        listId: id,
        id: itemId
      }
      const res = await Completed.mutateAsync(item, { onSuccess: async () => await itemQueryClient.invalidateQueries("list") });
    } catch (error) {
      console.log("error toggling id " + id)
    }
  };
  const addNewListItem = async (args: string) => {
    try {
      const item = {
        listId: id,
        item: {
          text: args,
          completed: false
        }
      };
      await newItem.mutateAsync(item, {
        onSuccess: async () => await itemQueryClient.invalidateQueries("list")
      });
    } catch (error: unknown) {
      alert("error!" + error);
    }
  };
  const removeItem = async (args: string) => {
    const item = {
      listId: id,
      id: args
    };
    deleteItem.mutateAsync(item);
  }
  if (!list) {
    return <p>failed to fetch list</p>
  }
  if (list.isLoading) {
    return <p>Loading list...</p>
  }
  return (
    <>
      {list.isRefetching ? <div className="loader-container"><div className="spinner"></div></div> : ""}
      <div id="list" className="w-4/5">
        <div className="rounded-md py-2 text-white text-center mb-3 bg-green-500 w-full">
          <a className="underline underline-offset-4"
            href={`whatsapp://send?text=${whatsAppShareString}`}
            data-action="share/whatsapp/share">Share your list via WhatsApp</a>
        </div>
        <AddNewListItem addNewListItem={addNewListItem} />
        <ListItems listItems={list.isRefetching ? list.data.listItems : list.data.listItems} handleToggleCompleted={handleToggleCompleted} removeItem={removeItem} />
        <div className="pt-3 text-sm">
          List ID: {list.data.listId}
        </div>
      </div>
    </>
  )
}

export default List