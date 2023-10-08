import { useEffect, useState } from "react";
//import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export default function Login() {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [data,setData] =useState([]);

    //const usenavigate=useNavigate();

    
        async function ProceedLogin(e) 
        {
            e.preventDefault();
            if (validate()) {
                const t= await axios.get("http://localhost:8000/user")
                setData(t.user)
                        if (data.password === password) {
                            toast.success('Success');
                            //usenavigate("/")
                        }else{
                            toast.error('Please Enter valid credentials');
                        }
                }
        }

        const validate = () => {
            let result = true;
            if (username === '' || username === null) {
                result = false;
                toast.warning('Please Enter Username');
            }
            if (password === '' || password === null) {
                result = false;
                toast.warning('Please Enter Password');
            }
            return result;
        }
    
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form className="container" onSubmit={ProceedLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control" required></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" onClick={validate}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
