import React from 'react'
import { useParams } from 'react-router-dom'
export default function Name1() {
    const parms=useParams();
    const {name}=parms;
  return (
    <div>
      Hi {name}
    </div>
  )
}
