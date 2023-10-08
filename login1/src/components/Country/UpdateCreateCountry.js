// import React, { useState, useLocation } from "react";
import Header from "../../Header";
import { CountryServices } from "../../Services/Countryservices";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const   UpdateCountry1 = () => {

//   const [countryvalue, setcountryvalue] = useState("");
//   const location=useLocation();
//   setcountryvalue(location.state);
//   const navigate = useNavigate();
// //edit part

//   async function countryaddupdate(e) {
//     e.preventDefault();
//     if(countryvalue === "")
//     {
//       const jsonoobjectcountryinsert = {
//         Country: {
//           CountryName: countryvalue,
//         },
//         SessionCompanyId: "2",
//       };

//       const responseadd = await CountryServices.countryinsert(
//         jsonoobjectcountryinsert
//       );
//       if (responseadd.data.status === "success") {
//         navigate("/Country");
//         toast.success("Country inserted successfully");
//       }
//       else
//       {
//         toast.error(responseadd.data.status)
//       }
//     }
//     else
//     {
//     }
//   }

// //update

//   return (
//     <div>
//       <Header />
//       <div style={{ margin: "50px" }}>
//         <form onSubmit={countryaddupdate}>
//           <table>
//             <tr>
//               <td>
//                 <input
//                   value={countryvalue}
//                   type="text"
//                   onChange={(e) => setcountryvalue(e.target.value)}
//                   placeholder="country name"
//                 />
//               </td>
//               <td>
//                 <input type="submit" />
//               </td>
//             </tr>
//           </table>
//         </form>
//         <Link to="/Country">
//           <Button variant="contained">Country Data</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default UpdateCountry1
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateCreateCountry = () => {
  const location = useLocation();
  const [countryvalue, setcountryvalue] = useState("");

  const id = location.state;
  // const cn = location.state.name;
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [remark, setremark] = useState("");
  useEffect(() => {
    setShow(id);
    if (id > 0) {
      countryedit();
    } else {
      setShow(0);
    }

    console.log(location.state);
  }, []);

  async function countryadd() {
    const jsonoobjectcountryinsert = {
      Country: {
        CountryName: countryvalue,
      },
      SessionCompanyId: "2",
    };

    const responseadd = await CountryServices.countryinsert(
      jsonoobjectcountryinsert
    );
    if (responseadd.data.status === "success") {
      navigate("/Country");
      toast.success("Country inserted successfully");
    } else {
      if (responseadd.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(responseadd.data.message);
      // navigate("/home")
    }
  }

  const [countryData, setCountryData] = useState([]);

  async function countryedit() {
    const request = {
      Country: {
        CountryId: id,
      },
      SessionCompanyId: "2",
    };
    const response = await CountryServices.countryedit(request);
    if (response.data.status === "success") {
      setCountryData(response.data.data.Country);
      setcountryvalue(response.data.data.Country.CountryName);
    } else {
      if (response.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(response.data.message);
    }
  }

  async function countryupdate1() {
    const jsonoobjectupdate = {
      Country: {
        CountryId: location.state,
        CountryName: countryvalue || countryData.CountryName,
        EditRemarks: remark,
      },
      SessionCompanyId: "2",
    };
    const responsupdate = await CountryServices.countryupdate(
      jsonoobjectupdate
    );
    if (responsupdate.data.status === "success") {
      toast.success(responsupdate.data.message);
      navigate("/Country");
    } else {
      if (responsupdate.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(responsupdate.data.message);
    }
  }

  return (
    <div>
      <Header />
      <div style={{ margin: "50px" }}>
        <table>
          <tr>
            <td>
              <label>Country Name</label><br/>
              <input
                type="text"
                defaultValue={countryData.CountryName}
                onChange={(e) => setcountryvalue(e.target.value)}
                placeholder="country name"
              />
            </td>
            <td>
              {show ? (<><label>Remark</label><br/>
                <input
                  onChange={(e) => setremark(e.target.value)}
                  placeholder="remarks"
                /></>
              ) : (
                ""
              )}
            </td>
            <td>
              {show ? "" : <>Add<br/><button onClick={countryadd}>Add</button></>}
              {show ? <>Update<br/><button onClick={countryupdate1}>Update</button></> : ""}
            </td>
          </tr>
        </table>
        <Link to="/Country">
          <Button variant="contained">Country Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateCreateCountry;
