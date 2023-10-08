import React, {useEffect, useState} from 'react'

function Yu(props) {
    const [a23,a33]= useState(0);
    
    useEffect(
        ()=>{
            alert("Hi");
        },[props.data]
    )
  return (
    <div>
      <button onClick={()=>a33(a23+1)}> Increast count</button>
      <button oncClick={()=>{props.data+" yo"}}>{props.data}</button>
    </div>
  )
}
export default Yu;