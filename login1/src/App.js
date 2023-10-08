import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import City from "./components/City/City";
import State from "./components/State/State";
import Country from "./components/Country/Country";
import Register from "./Register";
import U_C_Country from "./components/Country/UpdateCreateCountry";
import { ToastContainer } from "react-toastify";
import UpdateCreateState from "./components/State/UpdateCreateState";
import UpdateCreateCity from "./components/City/UpdateCreateCity";
import Report from "./components/Report/report";
import Preloader from "../src/components/Pre";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Preloader load={loading} />
      <div className="App" id={loading ? "no-scroll" : "scroll"}>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/City" element={<City />} />
          <Route path="/State" element={<State />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/add_update_country" element={<U_C_Country />} />
          <Route path="/add_update_state" element={<UpdateCreateState />} />
          <Route path="/add_update_city" element={<UpdateCreateCity />} />
          <Route path="/Report" element={<Report />} />
        </Routes>
      </div>
      <Preloader />
    </div>
  );
}

export default App;
