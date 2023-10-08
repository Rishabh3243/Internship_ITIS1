import React from 'react'
//import Gr from './component/Cruid1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Getapifeatch from './component/Cruid1'
import Form12 from './component/Form12'
export default function App2() {
  return (
    <div>
      {/* <Gr/> */}

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Getapifeatch />}>
          <Route path='form' element={<Form12 />}/>
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  )
}
