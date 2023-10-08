import React,{ useState, useEffect } from "react";
import Header from "../../Header";
import { CityServices } from "../../Services/Cityservices";
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



export default function City() {


  const [citydata, setcitydata] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    getcitydata();
  }, []);
  
  //add city
  function addcity(){
    navigate('/add_update_city',{
      state:-2
    })
  }
  //end city

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
      totalRecords: 100,
      paginationList: 1,
      list: [],
      columns: {
        "Sr No.": "",
        "City Name": "CityName",
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
  async function getcitydata() {
    const response = await CityServices.city(jsonobjectdrop);
    setcitydata(response.data.data.List);
  }
  //grid operation end

   //delete operation
   async function citydelete(h1) {
    const jsonobjectdelete = {
      City: {
        CityId: h1,
      },
      SessionCompanyId: "1",
    };
    const resdel = await CityServices.citydeactive(jsonobjectdelete);
    if (resdel) {
      toast.success(resdel.data.message);
      getcitydata();
    }
  }
  //delete operation end 

  //edit state
    async function cityedit(idn) {
      navigate('/add_update_city',{
        state:idn
      })
  }
  //edit state end

  return (
    <div>
      <Header />
      <div>
      <h1>City</h1>
        <div style={{ margin: "50px" }}>
                <Button variant="contained" onClick={addcity} style={{ marginLeft: "20px" }}>
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
                  <StyledTableCell>CityName</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {citydata.slice(pg * rpg, pg * rpg + rpg).map((item1, i) => (
                  <tr key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item1.CountryName}</TableCell>
                    <TableCell>{item1.StateName}</TableCell>
                    <TableCell>{item1.CityName}</TableCell>
                    <TableCell>
                      <Button
                      variant="contained"
                      onClick={() => cityedit(item1.CityId)}
                      style={{ marginRight: "20px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        citydelete(
                          item1.CityId,
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
            count={citydata.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
