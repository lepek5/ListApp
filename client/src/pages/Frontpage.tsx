import React from 'react'
import { Link } from "react-router-dom"

const Frontpage = () => {
  return (
    <div id="frontpage" className="w-4/5 flex flex-col">
      <h1 className="text-center text-8xl text-white bg-green-500 rounded-sm py-2 mb-6">Your List</h1>
      <p className="mb-6 text-stone-900 text-center">Create an interactive list for you or for your friends to keep up with things to do!</p>
    <div className="text-center">
    <Link to={`/new`} role="button" className="hover:bg-green-600 transition duration-200 text-4xl underline underline-offset-6 bg-green-700 text-white text-center px-2 py-2 rounded-md w-2/4">Create a New List!</Link>
    </div>
    </div>
  )
}

export default Frontpage