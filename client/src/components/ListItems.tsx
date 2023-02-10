import React from 'react'
import { ListItemType } from "../types"
import ListItem from "./ListItem"

const ListItems = ({listItems, removeItem, handleToggleCompleted} : {handleToggleCompleted: any, listItems: ListItemType[], removeItem: any}) => {

  if (!listItems || listItems.length === 0) {
    return <p>There's no list items yet, add a new one!</p>
  }
  return (
    <div id="list-items">
      {listItems.map((item : ListItemType) => <ListItem handleToggleCompleted={handleToggleCompleted} removeItem={removeItem} key={item._id} item={item} />)}
    </div>
  )
}

export default ListItems