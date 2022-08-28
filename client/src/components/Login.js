import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {Link, useNavigate} from 'react-router-dom';
import Context from '../contextApi/Context';
import Error404 from "./Error404";
import Spinner from "./Spinner"
export default function Login() {
  let [status, setStatus] = useState(false);
  let context = useContext(Context);
  let navigate = useNavigate();
  let alert = useAlert();
    let [data, setData] = useState({
        email: "",
        password: "",
      })
      let changeForm = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
      }
      let handleClick = async (e)=>{
        e.preventDefault();
        setStatus(true);
        let response = await context.fetchApi(data, "POST", "api/users/login", 'application/json');
        if(response){
          alert.success("Login Successfull");
          localStorage.setItem("ecommerceauthtoken",response.authtoken);
          context.fetchUser();
          navigate("/");
          return;
        }
        setStatus(false);
      }
  return (
    <div>
    {!context.user.success && 
    <div className="d-flex justify-content-center align-items-center w-100" style={{marginTop: "63px"}}>
      <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)", margin:"10vh 0"}}>
        <h3 className="text-center fw-bold">Login</h3>
        <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
      <form>
      <div className="mb-3">
  <label htmlFor="email" className="form-label">Email:</label>
  <input defaultValue={data.email} onChange={changeForm} type="email" className="form-control bg-dark text-white p-2" id="email" name="email" required/>
</div>
<div className="mb-3">
  <label htmlFor="Password" className="form-label">Password:</label>
  <input defaultValue={data.password} onChange={changeForm} type="password" className="form-control bg-dark text-white p-2" id="password" name="password" required/>
</div>
  <div className='d-flex justify-content-end'><Link to="/enterEmail" className="fw-bold" style={{color: "#00bcd4"}}>Forget Password?</Link></div>
  {status && <Spinner margin={"10px"}/>}
  <div className='d-flex justify-content-center m-3'><button disabled={status} type="submit" onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Login</button></div>
   </form>
      </div>
    </div>}
    {context.user.success && 
    <Error404 margin={"63px"}/>}
    </div>
  )
}
