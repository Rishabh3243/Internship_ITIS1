import axios from 'axios';
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

export default function Form12() {


    const [fname,setfname]= useState("");
    const [fage,setage]= useState("");
    const [fcity,setfcity]= useState("");

   async function h45(e)
    {
        const requestOptions = {
          "name": fname,
          "age": fage,
          "city": fcity,
      };
      await axios.post('http://localhost:3000/data',requestOptions);
    }
  return (
    <div>
      <form onSubmit={h45}>
        <input type='text' onChange={(e)=>setfname(e.target.value)}/>
        <input type='number' onChange={(e)=>setage(e.target.value)}/>
        <input type='text' onChange={(e)=>setfcity(e.target.value)}/>
        <input type='submit'/>
      </form>
    </div>
  )
}
