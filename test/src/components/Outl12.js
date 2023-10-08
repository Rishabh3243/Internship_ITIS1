import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Outl12() {
    const l=useLocation();
    console.log(l);
  return (
    <div>
      Hi nested Hi
    </div>
  )
}
