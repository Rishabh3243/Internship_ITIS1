import React, {useState,useEffect} from "react";
import { Grid, TableCell } from "@mui/material";
import axios from 'axios';
import { FormLabel } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { MultiSelect } from "react-multi-select-component";
import { tableCellClasses } from '@mui/material/TableCell';
import {Radio,Table,TableBody, TableHead, TableRow,Button, TableContainer } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
export default function Form_Crud() {

    const [first_name,setFirstName]= useState("");
    const [last_name,setLastName]= useState("");
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const [gender,setGender]=useState("");
    const [city,setCity]= useState([]);
    const [checked, setChecked] = useState(false);
    const [review,setReview]=useState(" ");
//    const [anand,setanand]=useState("");
//    const [Nadiad,setNadiad]=useState("");
//    const [Bharuch,setBharauch]=useState("");
//    const [first_nameU,setFirstNameU]= useState("");
//    const [last_nameU,setLastNameU]= useState("");
//    const [emailU,setEmailU]=useState("");
//    const [mobileU,setMobileU]=useState("");
//    const [genderU,setGenderU]=useState("");
//    const [cityU,setCityU]= useState("");
//    const [fid,setid]=useState("");
    const [data1,setData1]=useState([]);

    useEffect(()=>{
        getdata();
    },[]);


/*
    const handleFileUpload = (event) => {
        // get the selected file from the input
        const file = event.target.files[0];
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file);
        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        axios
          .post("http://localhost:3000/data", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            // handle the response
            console.log(response);
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          });
      };
*/


    function checkboxform(){
        var x = document.getElementById("t45");
        if (checked === true)
        {
            document.getElementById("t47").required = false;
            x.style.display = "none";
            setChecked(!checked)
        }
        if (checked === false)
        {
            document.getElementById("t47").required = true;
            x.style.display = "block";
            setChecked(!checked)
        }
        if (review === "")
        {
            alert("You have to be older 18!");
        }
    }

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

    function k(e1)
    {
        setGender(e1.target.value)
    }

    async function getdata(){
        const resp12= await axios.get("http://localhost:3000/data");
        // const resp1=resp12.json();
        setData1(resp12.data);
        // console.log(location.state.name);
    }

    function checkName(h)
    {

        const si=/\s/g;
        let li=si.test(h);
        if (li)
        {
            document.getElementById("fistn").innerHTML = "white space is not allowed";

        }
        if (!li)
        {
            setFirstName(h)
            document.getElementById("fistn").innerHTML = "";
        }
    }

    function checkmobile(e)
    {
        const d = e.target.value.replace(/\D/g, "")
        setMobile(d);
    }

    async function senddata()
    {

        if (first_name !== "" && mobile !== "")
        {
            const requestOptions = {
                "First_Name": first_name,
                "Last_Name":last_name,
                "Email":email,
                "Mobile":mobile,
                "City":city,
                "Gender":gender,
                "Review":review
          };
          await axios.post('http://localhost:3000/data',requestOptions);
        }

    }

    async function deletedata(v)
    {
        await axios.delete("http://localhost:3000/data/"+v);
        getdata();
    }
//
//    async function updateUser()
//    {
//      const requestOptions = {
//        "First_Name": first_nameU,
//        "Last_Name":last_nameU,
//        "Email":emailU,
//        "Mobile":mobileU,
//        "City":cityU,
//        "Gender":genderU
//      }; 
//      await axios.put("http://localhost:3000/data/"+fid,requestOptions);
//    }

const data56 = [  { label: "Anand", value: "anand" },
{ label: "Bharuch", value: "bharuch" },
{ label: "Nadiad", value: "nadiad"},];

  return (
    <div>
        <Grid lg={12} item container spacing={10}>
            <Grid item lg={1} sm={1} xs={12}>

            </Grid>
            <Grid item lg={5} sm={5} xs={12}>
                <form onSubmit={senddata} enctype="multipart/form-data">
                    <h3>Register</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <FormLabel>First Name</FormLabel>
                                </td>
                                <td>
                                    <input
                                            label="First Name"
                                            color='secondary'
                                            variant='filled'
                                            type='text' 
                                            pattern="^\w+([\w ]*\w)*$"
                                            onChange={(e)=>checkName(e.target.value)}
                                            required
                                    /> 
                                    <p id="fistn"></p>                              
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Last Name</FormLabel>
                                </td>
                                <td>
                                    <input
                                            label="Last Name"
                                            color='secondary'
                                            variant='filled'
                                            type='text' 
                                            onChange={(e)=>setLastName(e.target.value)} 
                                            required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Email Id</FormLabel>
                                </td>
                                <td>
                                    <input
                                        label="Email ID"
                                        color='secondary'
                                        variant='filled'
                                        type='email' 
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Mobile</FormLabel>
                                </td>
                                <td>
                                    <input
                                        label="Mobile No"
                                        type="text"
                                        autocomplete="off"
                                        pattern="[1-9]{1}[0-9]{9}"
                                        inputmode="number"
                                        maxLength={10}
                                        onChange={(e)=>checkmobile(e)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>City</FormLabel>
                                </td>
                                <td>
                                        <MultiSelect
                                            options={data56}
                                            selectedValues={city.selectedValue}
                                            value={city}
                                            onChange={setCity}
                                            labelledBy="Select"
                                        />
                                    {/*<Select onChange={(e)=>setCity(e.target.value)}>
                                        <MenuItem value={'Anand'}>Anand</MenuItem>
                                        <MenuItem value={'Nadiad'}>Nadiad</MenuItem>
                                    </Select>*/}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Gender</FormLabel>
                                </td>
                                <td>
                                        <span>Male</span>
                                        <Radio 
                                        color='secondary'
                                        value="male"
                                        checked={gender==="male"}
                                        onChange={(e1)=>k(e1)}
                                        />
                                        
                                        <span>Female</span>
                                        <Radio 
                                        color='secondary'
                                        value="female"
                                        checked={gender==="female"}
                                        onChange={(e1)=>k(e1)}
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Review : 
                                    <input
                                        type="checkbox"
                                        value={checked}
                                        onChange={checkboxform}
                                        multiple
                                    />
                                </td>
                                <td id="t45" style={{display:'none'}}>
                                    <input id="t47"
                                    type="text"
                                    onChange={(e)=>setReview(e.target.value)}
                                    
                                    />
                                </td>
                            </tr>
                          {/*  <tr>
                                <td>
                                <input type="file" onChange={handleFileUpload} accept='application/pdf'/>
                                </td>
                                <td>
                                </td>
                            </tr>*/}
                            <tr>
                                <td>
                                <input type='submit'/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
            {/*
            <form onSubmit={updateUser}>
                    <h3>Update User</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <FormLabel>First Name</FormLabel>
                                </td>
                                <td>
                                    <TextField
                                            value={first_nameU}
                                            label="First Name"
                                            color='secondary'
                                            variant='filled'
                                            type='text' 
                                            onChange={(e)=>setFirstNameU(e.target.value)} 
                                            required
                                    />                               
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Last Name</FormLabel>
                                </td>
                                <td>
                                    <TextField
                                            value={last_nameU}
                                            label="Last Name"
                                            color='secondary'
                                            variant='filled'
                                            type='text' 
                                            onChange={(e)=>setLastNameU(e.target.value)} 
                                            required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Email Id</FormLabel>
                                </td>
                                <td>
                                    <TextField
                                        value={emailU}
                                        label="Email ID"
                                        color='secondary'
                                        variant='filled'
                                        type='email' 
                                        onChange={(e)=>setEmailU(e.target.value)} 
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Mobile</FormLabel>
                                </td>
                                <td>
                                    <TextField
                                        value={mobileU}
                                        label="Mobile No"
                                        color='secondary'
                                        variant='filled'
                                        type='number' 
                                        onChange={(e)=>setMobileU(e.target.value)} 
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>City</FormLabel>
                                </td>
                                <td>
                                    <Select value={cityU} onChange={(e)=>setCity(e.target.value)}>
                                        <MenuItem value={'Anand'}>Anand</MenuItem>
                                        <MenuItem value={'Bharuch'}>Bharuch</MenuItem>
                                        <MenuItem value={'Nadiad'} >Nadiad</MenuItem>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormLabel>Gender</FormLabel>
                                </td>
                                <td>
                                        <span>Male</span>
                                        <Radio 
                                        color='secondary'
                                        value="male"
                                        checked={gender==="male"}
                                        onChange={(e1)=>k(e1)}
                                        />
                                        
                                        <span>Female</span>
                                        <Radio 
                                        color='secondary'
                                        value="female"
                                        checked={gender==="female"}
                                        onChange={(e1)=>k(e1)}
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <input type='submit' label="Update Data"/>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>*/}
            </Grid>
      </Grid>

      <div>
        <TableContainer component={Paper}>
        <Table id="my-table"
            >
                <TableHead color='info'>
                    <StyledTableRow>
                        <StyledTableCell>SRno</StyledTableCell>
                        <StyledTableCell>First name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Email ID</StyledTableCell>
                        <StyledTableCell>Mobile No</StyledTableCell>
                        <StyledTableCell>City</StyledTableCell>
                        <StyledTableCell>Gender</StyledTableCell>
                        <StyledTableCell>Review</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                        {/*<StyledTableCell>Update</StyledTableCell>*/}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                {
                data1.map((item1,i)=>
                    <tr key={i}>
                    <TableCell>{i + 1}</TableCell>
                        <TableCell>{item1.First_Name}</TableCell>
                        <TableCell>{item1.Last_Name}</TableCell>
                        <TableCell>{item1.Email}</TableCell>
                        <TableCell>{item1.Mobile}</TableCell>
                        <TableCell>
                        <Table><tbody>
                        {item1.City.map((item2)=><tr>
                            <TableCell>{item2.label}</TableCell>
                        </tr>)}</tbody>
                        </Table>
                        </TableCell>
                        <TableCell>{item1.Gender}</TableCell>
                        <TableCell>{item1.Review}</TableCell>
                        <TableCell><Button variant="contained" onClick={()=>deletedata(item1.id)}>delete</Button></TableCell>
                        {/*<TableCell><Button variant="contained" onClick={()=>(
                            setFirstNameU(item1.First_Name),
                            setLastNameU(item1.Last_Name),
                            setEmailU(item1.emailU),
                            setGenderU(item1.genderU),
                            setCityU(item1.cityU),
                            setMobileU(item1.mobileU),
                            setid(item1.id)
                        )}>Update</Button></TableCell>*/}                    
                    </tr>
                )
                }
                </TableBody>
            </Table>
            </TableContainer>
      </div>
    </div>
  )
}
