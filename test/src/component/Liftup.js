import React from 'react'

export default function Liftup(prop) {
    const l="Rishabh";
  return (
    <div>
        <button onClick={()=>prop.data1(l)}>Send name to upper</button>
    </div>
  )
}
