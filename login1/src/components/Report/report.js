import React, { useState, useEffect } from "react";
import Header from "../../Header";
import { ReportServices } from "../../Services/Reportservices";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  Button,
  TableRow,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { environment } from "../../Environment/Environment";
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../../App.css';

export default function Report() {
  const [frontdate, setfrontdata] = useState("");
  const [enddata, setenddata] = useState("");
  const [reportdata, setreportdata] = useState([]);
  const [reportdata2, setreportdata2] = useState([]);
  const [status, setstatus] = useState("");
  const [statusstore, setstatusstore] = useState([]);
  const [remark, setRemark] = useState("");
  const [userstore, setuserstore] = useState([]);
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getstatus();
  }, []);

  //loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [loading]);
  
  //loader end

  //style

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (a) => {
    getdropstatus();
    editreport1(a);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //style end

  //edit
  async function editreport1(a) {
    const jsoneditreport = {
      Registration: {
        RegistrationId: a,
      },
    };
    console.log(a);
    const response = await ReportServices.reportedit(jsoneditreport);
    if (response.data.status === "success") {
      if (response.data.data.Registration !== null) {
        setreportdata2(response.data.data.Registration);
      } else {
        setreportdata2("");
      }
    } else {
      if (response.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(response.data.message);
    }
  }
  //edit end

  //grid operation
  const jsonobjectdrop = {
    RegistrationReport: {
      FromDate: frontdate,
      ToDate: enddata,
    },
    SessionCompanyId: "2",
  };
  async function getrecorddata() {
    const response = await ReportServices.report(jsonobjectdrop);
    if (response.data.status === "success") {
      if (response.data.data.GetRegistrationReport !== null) {
        setreportdata(response.data.data.GetRegistrationReport);
      } else {
        setreportdata("");
      }
    } else {
      if (response.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(response.data.message);
    }
  }
  //grid operation end

  //search
  function search() {
    if (frontdate !== "" && enddata !== "") {

      if (frontdate > enddata) {
        toast.error("Enter proper dates");
      } else {
        setLoading(false);
        getrecorddata();
      }
    } else {
      toast.error("Please Enter Dates");
    }
  }
  //search end

  //drop down operation
  const jsonobjectdropdownstatus = {};
  async function getstatus() {
    const response = await ReportServices.reportdropstatus(
      jsonobjectdropdownstatus
    );
    setstatusstore(response.data.List);
  }
  //drop down operation

  //drop down operation
  const jsonobjectdropdownuser = {};
  async function getdropstatus() {
    const response = await ReportServices.reportdropuser(
      jsonobjectdropdownuser
    );
    setuserstore(response.data.List);
  }
  //drop down operation

  //clear
  function cleardata() {
    setenddata("");
    setfrontdata("");
    setreportdata([]);
  }
  //clear end

  return (
    <div>
      <Header />
      <div>
        <h1>Report</h1>
        <div>
          <table style={{ margine: "20px" }}>
            <tbody style={{ margine: "20px" }}>
              <tr>
                <td>
                  <pre> </pre>
                </td>
                <td>
                  <label>
                    <h5>From date</h5>
                  </label>
                  <br />
                  <input
                    value={frontdate}
                    onChange={(e) => setfrontdata(e.target.value)}
                    type="date"
                  />
                </td>
                <td>
                  <pre> </pre>
                </td>
                <td>
                  <label>
                    <h5>End date</h5>
                  </label>
                  <br />
                  <input
                    value={enddata}
                    onChange={(e) => setenddata(e.target.value)}
                    type="date"
                  />
                </td>
                <td>
                  <pre> </pre>
                </td>
                <td>
                  <label>
                    <h5>Search</h5>
                  </label>
                  <br />
                  <Button variant="contained" onClick={search} load={loading}>
                    Search
                  </Button>
                </td>
                <td>
                  <pre> </pre>
                </td>
                <td>
                  <label>
                    <h5>Clear</h5>
                  </label>
                  <br />
                  <Button variant="contained" onClick={cleardata}>
                    Clear
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id={loading === true ? "no-scroll" : "scroll"}>
        <div style={{ margin: "50px" }}>
          <TableContainer
            component={Paper}
            style={{ margin: "20px", width: "100%" }}
          >
            <Table id="my-table">
              <TableHead color="info">
                <StyledTableRow>
                  <StyledTableCell>SRno</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Email Address</StyledTableCell>
                  <StyledTableCell>Mobile No</StyledTableCell>
                  <StyledTableCell>Applied for name</StyledTableCell>
                  <StyledTableCell>Reference Name</StyledTableCell>
                  <StyledTableCell>
                    Interested technology's name
                  </StyledTableCell>
                  <StyledTableCell>Health issues</StyledTableCell>
                  <StyledTableCell>No of years</StyledTableCell>
                  <StyledTableCell>Current Company</StyledTableCell>
                  <StyledTableCell>City</StyledTableCell>
                  <StyledTableCell>College Name</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell>
                  <StyledTableCell>Download</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {reportdata &&
                  reportdata.slice(pg * rpg, pg * rpg + rpg).map((item1, i) => (
                    <tr key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item1.CreatedOn}</TableCell>
                      <TableCell>{item1.Firstname}</TableCell>
                      <TableCell>{item1.Lastname}</TableCell>
                      <TableCell>{item1.Email}</TableCell>
                      <TableCell>{item1.Mobileno}</TableCell>
                      <TableCell>{item1.AppliedforName}</TableCell>
                      <TableCell>{item1.ReferenceName}</TableCell>
                      <TableCell>{item1.InterestedTechnologiesName}</TableCell>
                      <TableCell>{item1.HealthIssue}</TableCell>
                      <TableCell>{item1.NoOfYears}</TableCell>
                      <TableCell>{item1.CurrentCompany}</TableCell>
                      <TableCell>{item1.City}</TableCell>
                      <TableCell>{item1.CollegeName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleClickOpen(item1.RegistrationId)}
                        >
                          <VisibilityIcon color="primary" fontSize="large" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <a
                          className="p-2 f-d-pop"
                          href={ environment.ProtocolFile + item1.CV}
                          target="_blank"
                          style={{ color: "black", float: "right" }}
                          download
                        >
                          <SimCardDownloadRoundedIcon color="primary" fontSize="large" />
                        </a>
                      </TableCell>
                    </tr>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={reportdata.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"User Details"}</DialogTitle>
            <DialogContent style={{ width: "600px" }}>
              {reportdata2 === "" ? (
                ""
              ) : (
                <div className="container">
                  <div className="row">
                    <div className="col col-lg-4">
                      <div>
                        <div className="row">
                          <label>
                            <b>Status</b>
                          </label>
                          <select disabled 
                            id="dropselect"
                            class="form-select"
                            aria-label="Disabled select example"
                            onChange={(e) => setstatus(e.target.value)}
                            value={status}
                          >
                            <option value="5" selected>Interviewer</option>
                            {/* {statusstore.map((item1) => (
                              <option value={item1.Value}>{item1.Text}</option>
                            ))} */}
                          </select>
                          <br />
                        </div>
                        <br />
                        <div className="row">
                          <label>
                            <b>User</b>
                          </label>
                          <select
                            id="dropselect"
                            class="form-select"
                            aria-label="Disabled select example"
                            onChange={(e) => setuser(e.target.value)}
                            value={user}
                          >
                            <option value="">--Select--</option>
                            {userstore.map((item1) => (
                              <option value={item1.Value}>{item1.Text}</option>
                            ))}
                          </select>
                        </div>
                        <br />
                        <div className="row">
                          <label>
                            <b>Remark</b>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                        </div>
                        <br/>
                        <div>
                          <center><Button variant="contained">Update</Button></center>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col col-lg-7"
                      style={{ margin: "5px", backgroundColor: "#61bc8f" }}
                    >
                      <p className="row">
                        <p
                          className="col col-11.7"
                          style={{
                            padding: "5px",
                            backgroundColor: "#12834a",
                            color: "white",
                          }}
                        >
                          <b>Date : </b>
                          {reportdata2.CreatedOn}
                        </p>
                      </p>
                      <p className="row">
                        <p className="col col-lg-6">
                          <b>First Name : </b>
                          {reportdata2.Firstname}
                        </p>
                        <p className="col col-lg-6">
                          <b>City : </b>
                          {reportdata2.City}
                        </p>
                        <p className="col col-lg-6">
                          <b>Last Name : </b>
                          {reportdata2.Lastname}
                        </p>
                        <p className="col col-lg-6">
                          <b>Applied for name : </b>
                          {reportdata2.AppliedforName}
                        </p>
                        <p className="col col-lg-6">
                          <b>Mobile No : </b>
                          {reportdata2.Mobileno}
                        </p>
                        <p className="col col-lg-6">
                          <b>College Name : </b>
                          {reportdata2.CollegeName}
                        </p>
                        <p className="col col-lg-6">
                          <b>Email : </b>
                          {reportdata2.Email}
                        </p>
                        <p className="col col-lg-6">
                          <b>Reference Name : </b>
                          {reportdata2.ReferenceName}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <DialogContentText id="alert-dialog-slide-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        </div>
        
      </div>
    </div>
  );
}
