import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { CountryServices } from "../../Services/Countryservices";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Country() {
  const [countrydata, setCountrydata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getcountrydata();
  }, []);

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

  const jsonobject1 = {
    GridParams: {
      totalRecords: 0,
      paginationList: 1,
      list: [],
      columns: {
        "Sr No.": "",
        "Country Name": "CountryName",
        Action: "",
      },
      searchValue: "",
      currentPage: "1",
      perPage: "100",
      direction: "desc",
      sortColumn: "CreatedOn",
    },
  };
  async function getcountrydata() {
    const response = await CountryServices.country(jsonobject1);
    setCountrydata(response.data.data.List);
  }

  async function countrydelete(h1, h2, h3, h4, h5) {
    const jsonobjectdelete = {
      Country: {
        CountryId: h1,
        CountryName: h2,
        CreatedOn: h3,
        CreatedIP: h4,
        Active: true,
        CompanyId: h5,
      },
      SessionCompanyId: "2",
    };
    const resdel = await CountryServices.countrydeactive(jsonobjectdelete);
    if (resdel) {
      toast.success("deleted !");
      getcountrydata();
    }
  }

  async function countryedit(idn) {
    navigate("/add_update_country", {
      state: idn,
    });
  }

  function adddatacountry() {
    navigate("/add_update_country", {
      state: -2,
    });
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Country</h1>
        <div style={{ margin: "50px" }}>
          <Button variant="contained" onClick={adddatacountry}>
            Add
          </Button>
        </div>
        {/* {JSON.stringify(countrydata, null, 2)} */}
        <TableContainer
          component={Paper}
          style={{ margin: "50px", width: "95%" }}
        >
          <Table id="my-table">
            <TableHead color="info">
              <StyledTableRow>
                <StyledTableCell>SRno</StyledTableCell>
                <StyledTableCell>Country Id</StyledTableCell>
                <StyledTableCell>Country name</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {countrydata.slice(pg * rpg, pg * rpg + rpg).map((item1, i) => (
                <tr key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item1.CountryId}</TableCell>
                  <TableCell>{item1.CountryName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => countryedit(item1.CountryId)}
                      style={{ marginRight: "20px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        countrydelete(
                          item1.CountryId,
                          item1.CountryName,
                          item1.CreatedOn,
                          item1.CreatedIP,
                          item1.CompanyId
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
          count={countrydata.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
