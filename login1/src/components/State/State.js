import React,{ useState, useEffect } from "react";
import Header from "../../Header";
import { StateServices } from "../../Services/Stateservices";
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


export default function State() {

  const [statedata, setstatedata] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    getstatedata();
  }, []);
  
  //add state
  function addstate(){
    navigate('/add_update_state',{
      state:-2
    })
  }
  //end state

  //style

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

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

  //grid operation
  const jsonobjectdrop = {
    GridParams: {
      totalRecords: 20,
      paginationList: 1,
      list: [],
      columns: {
        "Sr No.": "",
        "State Name": "StateName",
        Action: "",
      },
      searchValue: "",
      currentPage: "1",
      perPage: "100",
      direction: "desc",
      sortColumn: "CreatedOn",
    },
    SessionCompanyId: "1",
  };
  async function getstatedata() {
    const response = await StateServices.state(jsonobjectdrop);
    setstatedata(response.data.data.List);
  }
  //grid operation end

  //delete operation
  async function statedelete(h1) {
    const jsonobjectdelete = {
      State: {
        StateId: h1,
      },
      SessionCompanyId: "1",
    };
    const resdel = await StateServices.statedeactive(jsonobjectdelete);
    if (resdel) {
      toast.success(resdel.data.message);
      getstatedata();
    }
  }
  //delete operation end
  
  //edit state
      async function stateedit(idn) {
        navigate('/add_update_state',{
          state:idn
        })
    }
  //edit state end
  return (
    <div>
      <Header />
      <div>
        <h1>State</h1>
        <div style={{ margin: "50px" }}>
                <Button variant="contained" onClick={addstate} style={{ marginLeft: "20px" }}>
                  Add
                </Button>

          <TableContainer
            component={Paper}
            style={{ margin: "50px", width: "95%" }}
          >
            <Table id="my-table">
              <TableHead color="info">
                <StyledTableRow>
                  <StyledTableCell>SRno</StyledTableCell>
                  <StyledTableCell>Country name</StyledTableCell>
                  <StyledTableCell>StateName</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {statedata.slice(pg * rpg, pg * rpg + rpg).map((item1, i) => (
                  <tr key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item1.CountryName}</TableCell>
                    <TableCell>{item1.StateName}</TableCell>
                    <TableCell>
                      <Button
                      variant="contained"
                      onClick={() => stateedit(item1.StateId)}
                      style={{ marginRight: "20px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        statedelete(
                          item1.StateId,
                        )
                      }
                    >
                      Delete
                    </Button>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={statedata.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      {/* {JSON.stringify(statedrop, null, 2)} */}
    </div>
  );
}
