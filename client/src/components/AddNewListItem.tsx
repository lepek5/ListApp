import { useState } from 'react'
import { GrAddCircle } from "react-icons/gr"

const AddNewListItem = ({ addNewListItem }: { addNewListItem: any }) => {
  const [toAdd, setToAdd] = useState("");
  const emptyInput = () => {
    setToAdd("");
  }
  return (
    <form className="flex" action="submit">
      <input value={toAdd} onChange={(e: any) => setToAdd(e.target.value)} type="text" name="new-list-item" className="focus:outline-2 focus:outline-green-200 px-2 py-1 mb-2 outline-none w-full border-2 border-stone-200 rounded-md" />
      <button onClick={async (e) => {
        e.preventDefault();
        console.log("To Add", toAdd);
        await addNewListItem(toAdd);
        emptyInput();
      }} type="submit" className="px-1">
        <GrAddCircle size={42} />
      </button>
    </form>
  )
}

export default AddNewListItem