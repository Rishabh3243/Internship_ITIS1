import axios from 'axios';
import React, { useEffect,useState } from 'react'

export default function Getapifeatch() {
    const [data34,setData34] =useState([]);
    useEffect(()=>{
        getdata()
    },[]);

    async function getdata(){
        const resp12= await axios.get("http://localhost:3000/data");
        // const resp1=resp12.json();
        setData34(resp12.data);
        console.log(resp12);
    }

  return (
    <div>

        
        <table>
            <thead>
                <tr>
                    <td>SRno</td>
                    <td>name</td>
                    <td>age</td>
                    <td>city</td>
                </tr>
            </thead>
            <tbody>
            {
            data34.map((item1,i)=>
                <tr key={item1}>
                <td>{i + 1}</td>
                    <td>{item1.name}</td>
                    <td>{item1.age}</td>
                    <td>{item1.city}</td>
                </tr>
            )
            }
            </tbody>
        </table>
    
        {JSON.stringify(data34, null, 2)}
 
    </div>
  )
}
