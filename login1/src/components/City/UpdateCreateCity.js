import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CityServices } from "../../Services/Cityservices";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";

export default function UpdateCreateCity() {
    const [countryvalue, setcountry] = useState("");
    const [statevalue, setstate] = useState("");
    const [city,setcityname] = useState("");
    const location = useLocation();
    const id = location.state;
    const [show, setShow] = useState(false);
    const [remark, setremark] = useState();
    const navigate = useNavigate();
    const [statedrop, setdropdownstate] = useState([]);
    const [countrydrop,setdropdowncountry] = useState([]);
    const [CityData, setCityData] = useState([]);

    useEffect(() => {
        getCountry();
        getState();
        setShow(id);
        if (id > 0) {
           cityedit1();
        } else{
          setShow(0);
        }
      }, []); 
      
      useEffect(()=>
      {
        getState();
      },[countrydrop])
      
    
  //drop down operation
  const jsonobjectdropdown = {
    SessionCompanyId: 1,
  };
  async function getCountry() {
    const response = await CityServices.dropdowncountry(jsonobjectdropdown);
    setdropdowncountry(response.data.List);
  }
  async function getState(a) {
    const jsonobjectdropdown2 = {
        CountryId:countryvalue || a,
        };
    const response = await CityServices.dropdownstate(jsonobjectdropdown2);
    setdropdownstate(response.data.List);
  }
  //drop down operation

  
  //add state
  async function cityadd() {
    const jsonoobjectcountryinsert = {
      City: {
        CountryId: countryvalue,
        StateId: statevalue,
        CityName: city,
      },
      SessionCompanyId: "1",
    };

    const responseadd = await CityServices.cityinsert(
      jsonoobjectcountryinsert
    );
    if (responseadd.data.status === "success") {
      navigate("/City");
      toast.success("City inserted successfully");
    } else {
      if (responseadd.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(responseadd.data.message);
      // navigate("/home")
    }
  }
  //add state end  

  //edit

  async function cityedit1() {
    const request = {
      City: {
        CityId: id,
      },
      SessionCompanyId: "1",
    };
    const response = await CityServices.cityedit(request);
    if (response.data.status === "success") {
      setCityData(response.data.data.City);
      getState(response.data.data.City.CountryId);
    } else {
      if (response.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(response.data.message);
    }
  }
  //edit end

  //update
  async function cityupdate1() {
    const jsonoobjectupdate = {
      City: {
        CityId: id,
        StateId: statevalue || CityData.StateId,
        CountryId: countryvalue || CityData.CountryId,
        CityName: city || CityData.CityName,
        EditRemarks: remark,
      },
      SessionCompanyId: "1",
    };
    const responsupdate = await CityServices.cityupdate(jsonoobjectupdate);
    if (responsupdate.data.status === "success") {
      toast.success(responsupdate.data.message);
      navigate("/City");
    } else {
      if (responsupdate.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(responsupdate.data.message);
    }
  }
  //update end

  return (
    <div>
      <Header />
      <div style={{ margin: "50px" }}>
        <table>
          <tr>
            <td>
              <label>Country</label>
              <br />
              <select
                id="dropselect"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e)=>{setcountry(e.target.value);getCountry()}}
                value={countryvalue || CityData.CountryId}
              >
                <option value="">--Select--</option>
                {countrydrop.map((item1) => (
                  <option value={item1.Value}>{item1.Text}</option>
                ))}
              </select>
            </td>
            <td>
              <label>State</label>
              <br />
              <select
                id="dropselect"
                class="form-select"
                aria-label="Disabled select example"
                onChange={(e) => setstate(e.target.value)}
                value={statevalue || CityData.StateId}
              >
                <option value="">--Select--</option>
                {(statedrop === null ) ? ("") : (statedrop.map((item1) => (
                  <option value={item1.Value}>{item1.Text}</option>
                )))}
              </select>
            </td>
            <td>
              <label>City Name</label>
              <br />
              <input
                value={city || CityData.CityName}
                type="text"
                onChange={(e) => setcityname(e.target.value)}
              />
            </td>
            <td>
              {show ? (
                <>
                  <label>Remark</label>
                  <br />
                  <input
                    onChange={(e) => setremark(e.target.value)}
                    placeholder="remarks"
                  />
                </>
              ) : (
                ""
              )}
            </td>
            <td>
              {show ? (
                ""
              ) : (
                <>
                  <label>Add</label> <br />
                  <button onClick={cityadd}>Add</button>
                </>
              )}
              {show ? (
                <>
                  <label>Update</label> <br />
                  <button onClick={cityupdate1}>Update</button>
                </>
              ) : (
                ""
              )}
            </td>
          </tr>
        </table>
        <Link to="/City">
          <Button variant="contained">City Data</Button>
        </Link>
      </div>
    </div>
  )
}
