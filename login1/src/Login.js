import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { LoginServices } from "./Services/Loginservices";

export default function Login() {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();
  // useEffect(()=>{
  //     username='';
  //     password='';
  // })
  //dhruval
  //Admin@12311

  // async function ProceedLogin(e)
  // {
  //         e.preventDefault();
  //         if (validate()) {
  //             ///implentation
  //             // console.log('proceed');
  //             let inputobj={"UserName": username,
  //             "Password": password};
  //              await axios("http://192.168.0.213:5063/api/auth/login",{
  //                 method:'POST',
  //                 headers:{'content-type':'application/json'},
  //                 body:JSON.stringify(inputobj)
  //             }).then((resp) => {
  //                 console.log(resp)
  //                 if (Object.keys(resp).length === 0) {
  //                     toast.error('Login failed, invalid credentials');
  //                 }else{
  //                      toast.success('Success');
  //                         usenavigate('/home');
  //                 }
  //                 // if (Object.keys(resp).length === 0) {
  //                 //     toast.error('Please Enter valid username');
  //                 // } else {
  //                 //     if (resp.password === password) {
  //                 //         toast.success('Success');
  //                 //         sessionStorage.setItem('username',username);
  //                 //         usenavigate('/')
  //                 //     }else{
  //                 //         toast.error('Please Enter valid credentials');
  //                 //     }
  //                 // }
  //             }).catch((err) => {
  //                 toast.error('Login Failed due to :' + err.message);
  //             });
  //         }
  // }

  const jsonobject = {
    User: {
      UserName: username,
      Password: password,
    },
  };

  async function ProceedLogin(e) {
    e.preventDefault();

    const response = await LoginServices.Login(jsonobject);
    if (response.data.status === "success") {
      toast.success("Login Successfully !");
      Cookies.set("authtoken", response.data.authtoken);
      localStorage.setItem("companyid", response.data.data.Company.CompanyId);
      usenavigate("/home");
    } else {
      if (response.data.message === "authenticationerror") {
        usenavigate("/");
      }
      toast.error(response.data.message);
    }
  }

  function showpassword() {
    var x = document.getElementById("ipassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <>
      <div className="row">
        <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
          <form className="container" onSubmit={ProceedLogin}>
            <div className="card" style={{ backgroundColor: "lightgreen" }}>
              <div className="card-header">
                <h2>
                  <b>User Login</b>
                </h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    <b>User Name </b>
                    <span className="errmsg">*</span>
                  </label>
                  <input
                    value={username}
                    onChange={(e) => usernameupdate(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                  <br />
                </div>
                <div className="form-group">
                  <label>
                    <b>Password </b>
                    <span className="errmsg">*</span>
                  </label>
                  <input
                    id="ipassword"
                    type="password"
                    value={password}
                    onChange={(e) => passwordupdate(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                  <input type="checkbox" onClick={showpassword} />
                  <h6>Show Password</h6>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
