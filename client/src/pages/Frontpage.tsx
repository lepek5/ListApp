import React from 'react'
import { Link } from "react-router-dom"

const Frontpage = () => {
  return (
    <div id="frontpage">Lista<br />
    <Link to={`/new`}>Uusi lista</Link>
    </div>
  )
}

export default Frontpage