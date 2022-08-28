import React, { useContext } from 'react';
import Context from '../contextApi/Context';
import Steppers from "./Steppers";
import {State, Country} from "country-state-city";
import { useNavigate } from 'react-router-dom';
import Error404 from "./Error404";
export default function ConfirmOrder() {
  let navigate = useNavigate();
    let context = useContext(Context);
    let grossprice = context.cart.reduce((acc, e)=> acc + e.quantity * e.price, 0);
    let price = grossprice / 1.18;
    let tax = grossprice - price;
    let shipping = (grossprice >= 1000) ? 0 : 50;
    let totalprice = shipping + grossprice;
    let handleClick = ()=>{
      localStorage.setItem("TotalEcommerce", JSON.stringify({totalprice, shipping, price, tax}));
      context.setPrice({
        totalprice, shipping, price, tax
      })
      navigate("/payment");
    }
  return (
      <div>
      {
      context.user.success && context.cart.length !== 0 && Object.keys(context.address).length !== 0 && 
    <div style={{margin:"75px 0"}}>
      <Steppers active={1}/>
      <div className="d-flex">
      <div className="d-flex w-75 flex-column" style={{borderRight: "3px solid white"}}>
              <div className="w-100 p-3 text-white" style={{height: "30vh" }}>
               <h3 style={{color: "#00bcd4"}}>Shipping Info:</h3>
               <p><span className="fs-6 fw-bold">Name: </span>{context.user.response.name}</p>
               <p><span className="fs-6 fw-bold">Contact Number: </span>{context.address.phoneNo}</p>
               <p><span className="fs-6 fw-bold">Address: </span>{context.address.address}, {context.address.city}, {State.getStateByCodeAndCountry(context.address.state, context.address.country).name}, {Country.getCountryByCode(context.address.country).name}-{context.address.pinCode}</p>
              </div>
              <div className="w-100 text-white p-2 overflow-auto" style={{height: "80vh", }}>
                  <h3 style={{color: "#00bcd4"}}>Items:</h3>
                  {context.cart.map((e)=>{
                   return <div key={e._id} className="d-flex w-100 justify-content-center align-items-center" style={{height: "25vh" , borderBottom: "1px solid white"}}>
                       <img src={e.images[0].url} alt="image1" style={{height: "80%", width: "20%"}} />
                       <div className="d-flex flex-column p-2" style={{height: "80%", width: "40%", }}><h3>{(e.name.length > 25) ? `${(e.name).slice(0, 25)}...`: e.name}</h3>
                       <p>{(e.desc.length > 50) ? `${(e.desc).slice(0, 50)}...` : e.desc}</p></div>
                       <div className="d-flex justify-content-end align-items-center" style={{height: "80%", width: "40%", }}><h3>{e.quantity} X {e.price}<i className="fa-solid fa-indian-rupee-sign fa-fade"></i> =  {e.quantity * e.price}<i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h3></div>
                   </div>
})            }
              </div>
      </div>
          <div className="d-flex w-25 flex-column justify-content-between" style={{height: "70vh", }}>
          <div className="d-flex w-100 p-3 flex-column text-white align-items-end" style={{}}>
          <h3 className="w-100" style={{color: "#00bcd4"}}>Pricing: </h3>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Price: </span><p>{price.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Tax 18%: </span><p>{tax.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Shipping Charge: </span><p>{shipping} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-50" style={{borderTop: "4px solid #3dbbd2"}}></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-4 fw-bold">Total Coast: </span><h5>{totalprice} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h5></div>
          <div className="my-3 w-100 d-flex justify-content-center">
          <button onClick={handleClick} type="button" className="btn btn-primary text-black mx-2" style={{ backgroundColor: "#3dbbd2" }}>Confirm Order</button>
          </div>
          </div>

          <p className="p-3 text-white"><span className="fs-5 fw-bold">Note: </span>There is no delivery charge on order above 1000 rupees</p>
        
          </div>
      </div>
    </div>}
    {(!context.user.success ||
    context.cart.length === 0 || 
    Object.keys(context.address).length === 0) && <Error404 margin={"63px"}/>}
    </div>
  )
}
