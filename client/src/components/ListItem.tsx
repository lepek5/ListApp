import { GoCheck } from "react-icons/go";
import { TiDeleteOutline } from "react-icons/ti";
import { GrUndo } from "react-icons/gr";
import { ListItemType } from "../types";

const ListItem = ({ item, removeItem, handleToggleCompleted }: {handleToggleCompleted: any, item: ListItemType, removeItem: any }) => {
  const style = {
    textDecorationLine: item.completed ? "line-through" : "none",
    textDecorationThickness: "3px"
  }
  return (
    <div id={item._id} className="list-item">
      <div style={style} className="list-item-text">{item.text}</div>
      <div className="list-item-button-wrapper">
        <span onClick={() => handleToggleCompleted(item._id)}>{item.completed ? <GrUndo size={50} /> : <GoCheck size={50} />}</span>
        <span onClick={() => removeItem(item._id)}><TiDeleteOutline size={50} /></span>
      </div>
    </div>
  )
}

export default ListItem