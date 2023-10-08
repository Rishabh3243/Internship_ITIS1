import React, { useRef, useState } from 'react'
function App() {
  return (
    <div className="App">
      <h1>HOC </h1>
      <HOCRed cmp={Counter} />
    </div>
  );
}
function HOCRed(props)
{
  return <h2 style={{backgroundColor:'red',width:100}}>Red<props.cmp /></h2>
}

function Counter()
{
  const [count,setCount]=useState(0)
  return<div>
   <center> <h3>{count}</h3>
    <button onClick={()=>setCount(count+1)}>Update</button></center>
  </div>
}

export default App;