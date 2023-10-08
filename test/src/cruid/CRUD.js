import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Table,TableBody, TableHead, TableRow,Button, TableContainer } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './style.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Imag from '../image/b79fecda0e36d65deb38561b90877977-removebg-preview.png';
//import zIndex from '@mui/material/styles/zIndex';
export default function CRUD() {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    const [fname,setfname]= useState("");
    const [fage,setage]= useState("");
    const [fcity,setfcity]= useState("");
    const [fid,setid]=useState("");

    const [fname1,setfname1]= useState("");
    const [fage1,setage1]= useState("");
    const [fcity1,setfcity1]= useState("");



    useEffect(()=>{
        getdata();
    },[]);


    async function getdata(){
        const resp12= await axios.get("http://localhost:3000/data");
        // const resp1=resp12.json();
        setData34(resp12.data);
        // console.log(location.state.name);
    }

   async function h45(e)
    {
        const requestOptions = {
          "name": fname,
          "age": fage,
          "city": fcity,
      };
      await axios.post('http://localhost:3000/data',requestOptions);
    }

    const [data34,setData34] =useState([]);



    async function deletedata(v)
    {
        await axios.delete("http://localhost:3000/data/"+v);
        getdata();
    }

      async function updateUser()
      {
        const requestOptions = {
            "name": fname1,
            "age": fage1,
            "city": fcity1,
        }; 
        await axios.put("http://localhost:3000/data/"+fid,requestOptions);
      }

      const downloadPdf = () => {
        const doc = new jsPDF()
        
        autoTable(doc,{ html: '#my-table',
        showHead: "everyPage"
      })
      const pages = doc.internal.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;  //Optional
      const pageHeight = doc.internal.pageSize.height;  //Optional
      doc.setFontSize(10);  //Optional
              
      for (let j = 1; j < pages + 1 ; j++) {
        doc.setFontSize(20);
            let horizontalPos = pageWidth / 2;  //Can be fixed number
            doc.text("Record",horizontalPos-10, 10)
            let verticalPos = pageHeight - 10;  //Can be fixed number
            doc.setPage(j);
            doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {align: 'center'});
      };
      doc.addImage(Imag, 'JPEG',170,0, 25, 40,);
        doc.save('table.pdf')
        
      }



      
  return (
    <div style={{paddingLeft:"200px",paddingRight:"200px"}}>

    <div>

    </div>

      <Button variant="contained" onClick={()=>downloadPdf()}>Export</Button>
        <TableContainer component={Paper}>
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="my-table"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
        <Table id="my-table"
        >
            <TableHead color='info'>
                <StyledTableRow>
                    <StyledTableCell>SRno</StyledTableCell>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>name</StyledTableCell>
                    <StyledTableCell>age</StyledTableCell>
                    <StyledTableCell>city</StyledTableCell>
                    <StyledTableCell>delete</StyledTableCell>
                    <StyledTableCell>Update</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
            {
            data34.map((item1,i)=>
                <tr key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item1.id}</TableCell>
                    <TableCell>{item1.name}</TableCell>
                    <TableCell>{item1.age}</TableCell>
                    <TableCell>{item1.city}</TableCell>
                    <TableCell><Button variant="contained" onClick={()=>deletedata(item1.id)}>delete</Button></TableCell>
                    <TableCell><Button variant="contained" onClick={()=>(setid(item1.id), setfname1(item1.name),setage1(item1.age), setfcity1(item1.city))}>Update</Button></TableCell>
                </tr>
            )
            }
            </TableBody>
        </Table>
        </TableContainer>
        {/*{JSON.stringify(data34, null, 2)}*/}
        <div>
      <form onSubmit={h45}>
      <label>Add Data</label>
        <input type='text' onChange={(e)=>setfname(e.target.value)} placeholder='Name'  />
        <input type='number' onChange={(e)=>setage(e.target.value)} placeholder='Age'  />
        <input type='text' onChange={(e)=>setfcity(e.target.value)} placeholder='City'  />
        <input type='submit'/>
      </form>
    </div>
    <div>
      <form onSubmit={updateUser}>
      <label>Update Data</label>
        <input type='text' value={fname1} onChange={(e)=>setfname1(e.target.value)}/>
        <input type='number' value={fage1} onChange={(e)=>setage1(e.target.value)}/>
        <input type='text' value={fcity1} onChange={(e)=>setfcity1(e.target.value)}/>
        <input type='submit'/>
      </form>
    </div>
    </div>
  )
}
