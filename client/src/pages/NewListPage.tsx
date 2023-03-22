import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";

import { v1 as uuid } from "uuid";
import { createList } from "../services/listService";
const NewListPage = () => {
  const [list, setList] = useState();
  const [id, setId] = useState<string>();
  useEffect(() => {
    const createNew = async () => {
      try {
        const tmp = uuid();
        setId(tmp);
        const newList = await createList({listId: tmp, listItems: []});
        setList(newList);
      } catch (error: unknown) {
        return (<p>Creating new list failed because of {error instanceof Error ? error.message : "unknown error."}</p>)
      }
    }
    createNew();
  }, []);
  if (list) {
    return <Navigate to={`/${id}`} />
  }
  return (
    <div role="figure" id="create-list">Creating a new list....</div>
  )
}

export default NewListPage