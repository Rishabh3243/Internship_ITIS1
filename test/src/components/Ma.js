import React from 'react'
import Table from 'react-bootstrap/Table';
//import { useNavigate } from 'react-router-dom';
//import {map} from 'react'
export default function Ma() {
    const user = [
        { name:"Mukesh", age:"56", Code:"fronstend" },
        { name:"Jas", age:"52", Code:"fronstend" },
        { name:"Hst", age:"76", Code:"fronstend" },
    ]

  return (
    <div>
    <Table striped bordered hover>
      <tbody>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Age</th>
          <th>Code</th>
        </tr>
      </thead>
     {user.map((user,i)=>
        <tr key={user}>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.Code}</td>
        </tr>
        )}
      </tbody>
    </Table>
    </div>
  )
}
