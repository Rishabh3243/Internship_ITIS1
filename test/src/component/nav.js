import React from 'react'
import {Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home"
import Wrong from './Wrong'
import Na1 from './Name'
import Out1 from './Outl1'
import Out2 from './Outl12'
const nav = () => {
  return (
    <>
    <a href='/home'>Home</a>
    <BrowserRouter>
        <Routes>
            <Route path ="/home/" element={<Home/>}/>
            <Route path ="/home1/:name" element={<Na1/>}/>
            <Route path='/Outl1/' element={<Out1/>}>
              <Route path="Outl2" element={<Out2/>}/>
            </Route>
            <Route path ="/*" element={<Wrong/>}/>
        </Routes>
        <Link to="/home">
    Home
    </Link>
    <Link to="/home1/Rishabh">Rishabh</Link>
    <Link to="/home1/ROHIT">ROHIT</Link>
    <Link to="/Outl1/">Out1</Link>
    </BrowserRouter>

    </>
  )
}

export default nav