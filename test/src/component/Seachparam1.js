import React from 'react'
import { useSearchParams } from 'react-router-dom'
export default function Seachparam1() {
    const [searchParam,setSearchParam]=useSearchParams();
    const d = searchParam.get('age');
  return (
    <div>
    <p>
      Hi  {d};
      <button onClick={()=>{setSearchParam({age:40})}}></button>
      </p>
    </div>
  )
}
