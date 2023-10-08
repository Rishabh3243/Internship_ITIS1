import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { StateServices } from "../../Services/Stateservices";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";

export default function UpdateCreateState() {
  const [countryvalue, setcountry] = useState("");
  const location = useLocation();
  const id = location.state;
  const [show, setShow] = useState(false);
  const [remark, setremark] = useState();
  const navigate = useNavigate();
  const [statedrop, setdropdown] = useState([]);
  const [state, setstate] = useState("");

  useEffect(() => {
    getCountry();
    setShow(id);
    if (id > 0) {
      stateedit1();
    } else {
      setShow(0);
    }
  }, []);

  //drop down operation
  const jsonobjectdropdown = {
  };
  async function getCountry() {
    const response = await StateServices.dropdown(jsonobjectdropdown);
    setdropdown(response.data.List);
  }
  //drop down operation

  //add state
  async function stateadd() {
    const jsonoobjectcountryinsert = {
      State: {
        CountryId: countryvalue,
        StateName: state,
      },
      SessionCompanyId: "1",
    };

    const responseadd = await StateServices.stateinsert(
      jsonoobjectcountryinsert
    );
    if (responseadd.data.status === "success") {
      navigate("/State");
      toast.success("State inserted successfully");
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
  const [StateData, setStateData] = useState([]);

  async function stateedit1() {
    const request = {
      State: {
        StateId: id,
      },
      SessionCompanyId: "1",
    };
    const response = await StateServices.stateedit(request);
    if (response.data.status === "success") {
      setStateData(response.data.data.State);
    } else {
      if (response.data.message === "authenticationerror") {
        navigate("/");
      }
      toast.error(response.data.message);
    }
  }
  //edit end

  //update
  async function stateupdate1() {
    const jsonoobjectupdate = {
      State: {
        StateId: StateData.StateId,
        CountryId: countryvalue || StateData.CountryId,
        StateName: state || StateData.StateName,
        EditRemarks: remark,
      },
      SessionCompanyId: "1",
    };
    const responsupdate = await StateServices.stateupdate(jsonoobjectupdate);
    if (responsupdate.data.status === "success") {
      toast.success(responsupdate.data.message);
      navigate("/State");
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
                onChange={(e) => setcountry(e.target.value)}
                value={countryvalue || StateData.CountryId}
              >
                <option value="k">--Select--</option>
                {statedrop.map((item1) => (
                  <option value={item1.Value}>{item1.Text}</option>
                ))}
              </select>
            </td>
            <td>
              <label>State Name</label>
              <br />
              <input
                value={state || StateData.StateName}
                type="text"
                onChange={(e) => setstate(e.target.value)}
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
                  <button onClick={stateadd}>Add</button>
                </>
              )}
              {show ? (
                <>
                  {" "}
                  <label>Update</label> <br />
                  <button onClick={stateupdate1}>Update</button>{" "}
                </>
              ) : (
                ""
              )}
            </td>
          </tr>
        </table>
        <Link to="/State">
          <Button variant="contained">State Data</Button>
        </Link>
      </div>
    </div>
  );
}
