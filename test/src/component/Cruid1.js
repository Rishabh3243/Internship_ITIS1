import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Link , Outlet} from 'react-router-dom';
//import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
//import  Form1 from  './Form12'
//import Gr23 from './Getapifeatch'
export default function Getapifeatch() {
    const [data34,setData34] =useState([]);
    useEffect(()=>{
        getdata()
    },[]);

    //const navigate = useNavigate()

    async function getdata(){
        const resp12= await axios.get("http://localhost:3000/data");
        // const resp1=resp12.json();
        setData34(resp12.data);
        // console.log(location.state.name);
    }
    async function deletedata(v)
    {
        await axios.delete("http://localhost:3000/data/"+v);
        getdata();
    }

  return (
    <div>
        {/* <BrowserRouter>
            <Routes>
            <Route path="/" element={Getapifeatch}>
                <Route path='/form2' element={<Form1 g17={()=>adddata()}/>}/>
            </Route>
            </Routes>
        </BrowserRouter>
        <Link to="/form2"></Link> */}
        <Link to="form">add</Link>
        <Outlet/>
        <table>
            <thead>
                <tr>
                    <td>SRno</td>
                    <td>ID</td>
                    <td>name</td>
                    <td>age</td>
                    <td>city</td>
                </tr>
            </thead>
            <tbody>
            {
            data34.map((item1,i)=>
                <tr key={i}>
                <td>{i + 1}</td>
                <td>{item1.id}</td>
                    <td>{item1.name}</td>
                    <td>{item1.age}</td>
                    <td>{item1.city}</td>
                    <td><button onClick={()=>deletedata(item1.id)}>delete</button></td>
                </tr>
            )
            }
            </tbody>
        </table>
    
        {JSON.stringify(data34, null, 2)}
 
    </div>
  )
}
