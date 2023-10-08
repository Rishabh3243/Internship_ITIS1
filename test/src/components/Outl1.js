import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function Outl1() {
  return (
    <div>

    <h1>Yo</h1>
      <Link to="Outl2" state={{nam:"a"}}>
      Next Hi
      </Link>
      <Outlet/>
    </div>
  )
}
