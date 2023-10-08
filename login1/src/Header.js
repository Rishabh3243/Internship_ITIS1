import React from "react";
import "./style.css";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Img from "./components/images/3135768.png";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

export default function Header() {
  function openNav() {
    document.getElementById("mySidebar").style.width = "200px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  function openclosedrop() {
    var d2d = document.getElementById("dropdown-container2");
    if (d2d.style.display === "none") {
      d2d.style.display = "block";
    } else {
      d2d.style.display = "none";
    }
  }

  function jasm() {
    window.location.replace("/");
    Cookies.remove("authtoken");
  }

  const loggedInUser = Cookies.get("authtoken");
  if (!loggedInUser) {
    return <Navigate replace to="/" />;
  } else {
  }

  return (
    <div>
      <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
          x
        </a>
        <a>
          <Link to="/Home">Home</Link>
        </a>
        <a
          class="dropdown-btn"
          style={{ marginLeft: "27.5px" }}
          onClick={openclosedrop}
        >
          Data <ArrowDropDownCircleIcon></ArrowDropDownCircleIcon>
        </a>
        <div id="dropdown-container2">
          <a>
            <Link to="/Report">Report</Link>
          </a>
        </div>
        <a>
          <Link to="/Country">Country</Link>
        </a>
        <a>
          <Link to="/State">State</Link>
        </a>
        <a>
          <Link to="/City">City</Link>
        </a>
      </div>

      <div id="main">
        <button class="openbtn" onClick={openNav}>
          ☰ Menu
        </button>
        <div class="dropdown">
          <button class="dropbtn">
            <img src={Img} style={{ height: "50px" }} />
          </button>
          <div class="dropdown-content">
            <a href="#">
              <Link to="/">
                <button onClick={jasm}>log out</button>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
