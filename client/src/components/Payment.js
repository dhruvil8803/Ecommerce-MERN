import React,{useContext, useState} from 'react'
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import Context from '../contextApi/Context';
import Steppers from "./Steppers"
import Spinner from "./Spinner";
import Error404 from "./Error404";
export default function Payment() {
       let [data, setData] = useState({cvv:"", card:"", month: 1, year: 2022});
       let context = useContext(Context);
       let navigate = useNavigate();
       let [status, setStatus] = useState(false);
       let alert = useAlert();
       let changeForm = (e)=>{
           setData({...data, [e.target.name] : e.target.value})
       }

      let handleClick = async (e)=>{
        e.preventDefault();
        if(data.card.length !== 16 || ! /^\d+$/.test(data.card)) {
          alert.error("Card Number must be 16digit long");
        return;}
        if(data.cvv.length !== 3 || ! /^\d+$/.test(data.cvv)) {alert.error("CVV must be 3 digit long");
      return;}
        if(data.month > 12 || data.month < 1 || data.year < 2022) {
          alert.error("Invalid expiry date");
        return;}
        setStatus(true);
         let products = []
        context.cart.forEach((e)=>{
          products.push({
            name: e.name,
            desc: e.desc,
            price: e.price,
            quantity: e.quantity,
            product: e._id,
            image: {
              public_id: e.images[0].public_id,
              url : e.images[0].url
            }
          })
        })
        let payment = context.price;
        let body = {
          shippingInfo: context.address,
          orderItems: products,
          itemPrice: payment.price,
          taxPrice: payment.tax,
          shippingPrice : payment.shipping,
          totalPrice: payment.totalprice
        }
        let response = await context.fetchApi(body, "POST", "api/orders/addOrder", "application/json")
        if(response){
         alert.success("Order Placed Successfully");
         navigate("/myorder");
          context.setNull();
          return;
        }
        setStatus(false);
      }
  return (
    <div style={{margin: "75px 0"}}>
        {context.user.success && context.cart.length !== 0 && Object.keys(context.price).length === 4 && Object.keys(context.address).length !== 0 && <Steppers active={2} />}
    {context.user.success && context.cart.length !== 0 && Object.keys(context.price).length === 4 && Object.keys(context.address).length !== 0 &&
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="d-flex flex-column p-4 rounded w-25 text-white" style={{backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
        <h3 className="text-center fw-bold">Payment</h3>
        <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
      <form>
      <div className="mb-3">
  <label htmlFor="card" className="form-label">Card Number:</label>
  <input defaultValue={data.card} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="card" name="card" required/>
</div>
<div className="mb-3">
  <label htmlFor="cvv" className="form-label">CVV:</label>
  <input defaultValue={data.cvv} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="cvv" name="cvv" required/>
</div>
<div className="mb-3">
  <label htmlFor="expiry" className="form-label">Expiry:</label>
  <br/>
  <span className="fw-bold">Month:</span><input defaultValue={data.month} onChange={changeForm} type="number" min="1" max="12" className="form-control bg-dark text-white p-2 w-25 d-inline" id="month" name="month" required/>
  <span className="fw-bold">Year:</span><input defaultValue={data.year} onChange={changeForm} type="number" min="2022" className="form-control bg-dark text-white p-2 w-25 d-inline" id="year" name="year" required/>
</div>
 {status && <Spinner margin={"20px"}/>}
  <div className='d-flex justify-content-center m-3'><button disabled={status} type="submit" onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Pay-{context.price.totalprice} <i className="fa-solid fa-indian-rupee-sign"></i></button></div>
   </form>
      </div>
    </div>}
    {(!context.user.success || 
    context.cart.length === 0 || 
    Object.keys(context.price).length !== 4 || 
    Object.keys(context.address).length === 0) && <Error404 margin={"63px"}/>}
    </div>
  )
}
