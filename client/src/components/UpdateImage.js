import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import Context from '../contextApi/Context';
import Spinner from "./Spinner";
import Error404 from "./Error404";
export default function UpdateImage() {
    let context = useContext(Context);
    let alert = useAlert();
    let navigate = useNavigate();
  let [status, setStatus] = useState(false);
    let [image, setImage] = useState(context.user.success ? context.user.response.avatar.url : "");
    let [picture, setPicture] = useState("");

    let handleClick = async (e)=>{
      e.preventDefault();
      setStatus(true);
      let response = await context.fetchApi(picture, "PUT", "api/users/updateAvatar", "multipart/form-data");
      if(response){
           await context.fetchUser();
           navigate("/profile")
          alert.success("Profile Pick updated Successfully");
          return;
      }
      setStatus(false);
    }
    let changeForm = (e)=>{
      let reader = new FileReader();
      reader.onload = ()=>{
       if(reader.readyState === 2){
         setPicture({...picture, [e.target.name] : reader.result})
         setImage(reader.result);
       }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    
  return (
      <div>
      {context.user.success && 
      <div className="d-flex justify-content-center align-items-center w-100" style={{marginTop: "63px"}}>
        <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)", margin:"10vh 0"}}>
          <h3 className="text-center fw-bold">Change Avatar</h3>
          <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
        <form>
        <div className="mb-3">
<label htmlFor="Image" className="form-label d-block">Choose Avtar</label>
<div className='d-flex justify-content-evenly'>

<img src={image} alt="profile" className='rounded-circle' style={{height: "60px", width: "60px"}} accept="image/*"/>
<input type="file" onChange={changeForm} className="w-50 text-white" id="avtar" name="avatar" required/>
</div>
</div>
 {status && <Spinner margin={"10px"}/>}
    <div className='d-flex justify-content-center m-3'><button disabled={picture ? false : true} type="submit" onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Update</button></div>
     </form>
        </div>
      </div>}
      {!context.user.success && 
      <Error404 margin={"63px"}/>}
      </div>
  )
}

