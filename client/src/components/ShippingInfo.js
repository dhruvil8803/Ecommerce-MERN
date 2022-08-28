import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import Context from '../contextApi/Context';
import {Country, State, City} from "country-state-city";
import Steppers from './Steppers'
import Error404 from "./Error404";
export default function ShippingInfo() {
  let context = useContext(Context);
  let navigate = useNavigate();
  let alert = useAlert();
  let {address} = context;
  let [data, setData] = useState({
    address: address.address,
      city:  address.city,
      state: address.state,
      country: address.country,
      pinCode: address.pinCode,
      phoneNo: address.phoneNo
  })
  let changeForm = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  let handleClick = async (e)=>{
    e.preventDefault();
    if(data.phoneNo.length !== 10 || ! /^\d+$/.test(data.phoneNo)) {
        alert.error("Please enter valid phone number");
    return;}    
    if(data.pinCode.length !== 6 || ! /^\d+$/.test(data.pinCode)) {
        alert.error("Pin Code must be 6 character and should contain only numbers");
    return;}
    if(data.address.trim().length < 15) {
        alert.error("Address should atleast contain 15 characters");
    return;}
      context.saveAddress(data);
            alert.success("Shipping Address Saved");
            navigate("/confirmOrder")
  }
  return (
    <div style={{marginTop: "75px"}}>
       {context.user.success &&<Steppers active={0}/>}
    {context.user.success && 
    <div className="d-flex justify-content-center align-items-center w-100">
    <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)", margin: "10vh 0"}}>
      <h3 className="text-center fw-bold">Shipping Address</h3>
      <hr className="w-75 mx-auto" style={{borderTop: "2px solid white"}}/>
    <form>
    <div className="mb-3">
  <label htmlFor="address" className="form-label">Address:</label>
  <textarea defaultValue={data.address} onChange={changeForm} className="form-control bg-dark text-white p-2" id="address" name="address" required/>
</div>

<div className="mb-3">
  <label htmlFor="country" className="form-label">Country:</label>
  <select className="form-select text-white bg-dark" defaultValue={data.country} onChange={changeForm} name="country">
          <option value="">Country</option>
          {
          Country.getAllCountries().map((e)=> {return <option key={e.isoCode} value={e.isoCode}>{e.name}</option>})
          }
        </select>
        </div>
<div className="mb-3">
  <label htmlFor="state" className="form-label">State:</label>
  <select disabled={data.country ? false : true} className="form-select text-white bg-dark" defaultValue={data.state} onChange={changeForm} name="state">
          <option value="">State</option>
          {
          State.getStatesOfCountry(data.country).map((e)=> {return <option key={e.isoCode} value={e.isoCode}>{e.name}</option>})
          }
        </select></div>
<div className="mb-3">
  <label htmlFor="city" className="form-label">City:</label>
  <select disabled={data.state ? false : true} className="form-select text-white bg-dark" defaultValue={data.city} onChange={changeForm} name="city">
          <option value="">City</option>
          {
          City.getCitiesOfState(data.country, data.state).map((e)=> {return <option key={e.name} value={e.name}>{e.name}</option>})
          }
        </select></div>
<div className="mb-3">
  <label htmlFor="phoneNo" className="form-label">Phone Number:</label>
  <input defaultValue={data.phoneNo} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="phoneNo" name="phoneNo" required/>
</div>
<div className="mb-3">
  <label htmlFor="pinCode" className="form-label">Pin Code:</label>
  <input defaultValue={data.pinCode} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="pinCode" name="pinCode" required/>
</div>
<div className='d-flex justify-content-center m-3'><button disabled={
  (!data.address || !data.city || !data.state || !data.country || !data.phoneNo || !data.pinCode) ? true : false  
}type="submit" onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Save</button></div>
 </form>
    </div>
  </div>}
  {!context.user.success && 
    <Error404 margin={"opx"}/> }
    </div>
  )
}
