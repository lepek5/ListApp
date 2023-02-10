import { useState } from 'react'
import { GrAddCircle } from "react-icons/gr"

const AddNewListItem = ({addNewListItem} : {addNewListItem: any}) => {
  const [toAdd, setToAdd] = useState("");
  const emptyInput = () => {
    setToAdd("");
  }
  return (
    <div id="new-list-item">
        <input value={toAdd} onChange={(e: any) => setToAdd(e.target.value)} type="text" name="new-list-item" className="new-list-item" />
        <GrAddCircle size={50} onClick={async () => {
          await addNewListItem(toAdd);
          emptyInput();
        }} />
    </div>
  )
}

export default AddNewListItem