import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import Context from '../contextApi/Context';
import Error404 from "./Error404";
import Spinner from "./Spinner"
export default function UpdateProfile() {
  let [status, setStatus] = useState(false);
  let context = useContext(Context);
  let navigate = useNavigate();
  let alert = useAlert();
  let [data, setData] = useState({
    name: context.user.success ? context.user.response.name : "",
    email: context.user.success ? context.user.response.email : "",
  })
 
  let changeForm = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  let handleClick = async (e)=>{
    e.preventDefault();
    setStatus(true);
    let response = await context.fetchApi(data, "PUT", "api/users/updateProfile", "application/json");
    if(response){
      await context.fetchUser();
      navigate("/profile")
      alert.success("Profile Details updated");
      return;
    }
    setStatus(false);
  }
  return (
    <div>
    {context.user.success && 
    <div className="d-flex justify-content-center align-items-center w-100" style={{marginTop: "63px"}}>
    <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)", margin: "10vh 0"}}>
      <h3 className="text-center fw-bold">Update Detail</h3>
      <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
    <form>
    <div className="mb-3">
  <label htmlFor="name" className="form-label">Name:</label>
  <input defaultValue={data.name} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="name" name="name" required/>
</div>
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email:</label>
  <input defaultValue={data.email} onChange={changeForm} type="email" className="form-control bg-dark text-white p-2" id="email" name="email" required/>
</div>
{status && <Spinner margin={"10px"}/>}
<div className='d-flex justify-content-center m-3'><button type="submit" disabled={status} onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Update</button></div>
 </form>
    </div>
  </div>}
  {!context.user.success && 
    <Error404 margin={"63px"}/> }
    </div>
  )
}
