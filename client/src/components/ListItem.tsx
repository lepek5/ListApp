import { TiDeleteOutline } from "react-icons/ti";
import { ListItemType } from "../types";

const ListItem = ({ item, removeItem, handleToggleCompleted }: { handleToggleCompleted: any, item: ListItemType, removeItem: any }) => {
  const completed = "duration-300 transition shadow-md shadow-stone-200 rounded-lg px-3 py-2 text-stone-900 w-full bg-green-300 mb-2";
  const nonCompleted = "duration-300 transition shadow-md shadow-stone-200 rounded-lg px-3 py-2 text-stone-900 w-full mb-2"
  const handlePopUp = () => {
    const popup = document.getElementById("popup") as HTMLElement;
    if (popup) {
      if (popup.classList.contains("visible")) {
        popup.classList.remove("visible");
      } else {
        popup.classList.add("visible");
      }
    }
  }
  return (
    <>
      <div id="popup">
        Do you want do delete the {item.text}?
      </div>
      <div id={item._id} className="flex">
        <div onClick={() => handleToggleCompleted(item._id)} className={item.completed ? completed : nonCompleted}>{item.text}</div>
        <div className="list-item-button-wrapper">
          <span onClick={() => {
            //handlePopUp();
            removeItem(item._id)
          }}><TiDeleteOutline size={50} /></span>
        </div>
      </div>
    </>
  )
}

export default ListItem