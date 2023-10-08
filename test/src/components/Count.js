import { useState } from 'react'
import React, { useEffect } from 'react'

export default function H(props) {
    const [state, setstate] = useState(0)
    useEffect(()=>{
        alert("Hi");
    },[props.y])
  return (
    <div>
      <button onClick={()=>{setstate(state+1)}}>Count : {state}</button>
    </div>
  )
}
