import React, {useState} from 'react'
 const Toggle = (props) => {
    const [a,at]=useState(false);
  return (
    <div>
        {a ? <h1>hello</h1>:''}
        <button onClick={()=>at(!a)}>toggle</button>
        <br></br>
        <button onClick={props.data} >Say Hi!</button>
    </div>
  )
}
export default Toggle;