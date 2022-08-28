import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {useNavigate, useParams} from 'react-router-dom';
import Context from '../contextApi/Context';
import Spinner from "./Spinner"
import Error404 from "./Error404";
export default function Password() {
  let [status, setStatus] = useState(false);
    let context = useContext(Context);
    let alert = useAlert();
    let {token} = useParams();
    let navigate = useNavigate();
     let [data, setData] = useState({
        password : "",
        confirmPassword : ""
     });

    let handleClick = async (e)=>{
      e.preventDefault();
      setStatus(true);
      let response = await context.fetchApi(data, "POST", `api/users/resetPassword/${token}`, "application/json");
      if(response){
        navigate("/loginPage")
        alert.success("Password Changed successfully");
        return;
      }
      setStatus(false);
    }
    let changeForm = (e)=>{
      setData({...data, [e.target.name] : e.target.value});
    }
  return (
    <div>
    {!context.user.success && 
    <div className="d-flex justify-content-center align-items-center w-100" style={{marginTop: "63px"}}>
      <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)", margin:"10vh 0"}}>
        <h3 className="text-center fw-bold">Change Password</h3>
        <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
      <form>
      <div className="mb-3">
  <label htmlFor="Password" className="form-label">Create Password:</label>
   <input defaultValue={data.password} onChange={changeForm} type="password" className="form-control bg-dark text-white p-2" id="password" name="password" required/>
     </div>
      <div className="mb-3">
  <label htmlFor="Password" className="form-label">Confirm Password:</label>
   <input defaultValue={data.confirmPassword} onChange={changeForm} type="password" className="form-control bg-dark text-white p-2" id="password" name="confirmPassword" required/>
     </div>
     {status && <Spinner margin={"10px"}/>}
  <div className='d-flex justify-content-center m-3'><button type="submit" disabled={status} onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Update Password</button></div>
   </form>
      </div>
    </div>}
    {context.user.success && 
   <Error404 margin={"63px"}/> }
    </div>
  )
}
