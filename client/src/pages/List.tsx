import { useParams } from "react-router-dom";
import AddNewListItem from "../components/AddNewListItem";
import ListItems from "../components/ListItems";
import { getListById, } from "../services/listService";
import { createListItem, deleteListItem, toggleItemCompleted } from "../services/listItemService";
import { useMutation, useQuery, useQueryClient } from "react-query";

const List = () => {
  const whatsAppShareString = `Here's a List i want to share with you! ${document.URL}`;
  const { id } = useParams<{ id: string }>();
  const list = useQuery("list", async () => await getListById(id as string));
  const itemQueryClient = useQueryClient();
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
      const res = await Completed.mutateAsync(item, { onSuccess: async() => await itemQueryClient.invalidateQueries("list")});
      if (res) {
        console.log("toggled", id);
      }
    } catch (error) {
      console.log("error toggling id "+id)
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
      await newItem.mutateAsync(item, { onSuccess: async () => await itemQueryClient.invalidateQueries("list")});
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
  if (list.isLoading) {
    return <p>Loading list...</p>
  }
  return (
    <>
        { list.isRefetching ? <div className="loader-container"><div className="spinner"></div></div> : ""}
      <div id="list">
        List ID: {list.data.listId}<br />
        <div className="share-link">
          <a href={`whatsapp://send?text=${whatsAppShareString}`} data-action="share/whatsapp/share">Share via Whatsapp</a>
        </div>
        <AddNewListItem addNewListItem={addNewListItem} />
        <ListItems listItems={ list.isRefetching ? list.data.listItems : list.data.listItems} handleToggleCompleted={handleToggleCompleted} removeItem={removeItem} />
      </div>
    </>
  )
}

export default List