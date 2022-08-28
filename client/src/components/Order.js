import React, { useRef, useContext, useEffect, useState} from 'react'
import { useAlert } from "react-alert";
import Context from '../contextApi/Context';
import OrderItem from './OrderItem'
import {State, Country} from "country-state-city";
import Error404 from "./Error404";
export default function Order() {
  let ref = useRef(null);
    let alert = useAlert();
    let context = useContext(Context);
    let [status, setStatus] = useState(false);
    let [orders, setOrders] = useState([]);
    let [myorder, setMyorder] = useState({success: false});
    let getAllOrders = async ()=>{
        let response = await context.fetchApi("", "GET", `api/orders/showAllOrder`, "");
        setOrders(response.response);
    }
    useEffect(()=>{
        setStatus(false);
        getAllOrders();
          setStatus(true);
        // eslint-disable-next-line
      }, []);
      let getOrder = async (id)=>{
           let response = await context.fetchApi("", "GET", `api/orders/showOrder/${id}`, "");
           if(!response){
               return;
           }
           setMyorder(response);
           ref.current.click();
      }
      let deleteOrder = async (id)=>{
        let response = await context.fetchApi("", "DELETE", `api/orders/deleteOrder/${id}`, "");
        if(!response) {
          return;
        }
        await getAllOrders();
        alert.success("Order cancelled successfully and your money will be transferd back to your account soon");
      }
  return (
    <div>
<button type="button" ref={ref} className="btn btn-primary m-5 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
{context.user.success && myorder.success && <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Order</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
         

      <div className="d-flex">
      <div className="d-flex w-75 flex-column" style={{borderRight: "3px solid white"}}>
              <div className="w-100 p-3 text-white" style={{height: "30vh" }}>
               <h3 style={{color: "#00bcd4"}}>Shipping Info:</h3>
               <p><span className="fs-6 fw-bold">Name: </span>{context.user.response.name}</p>
               <p><span className="fs-6 fw-bold">Contact Number: </span>{myorder.response.shippingInfo.phoneNo}</p>
               <p><span className="fs-6 fw-bold">Address: </span>{myorder.response.shippingInfo.address}, {myorder.response.shippingInfo.city}, {State.getStateByCodeAndCountry(myorder.response.shippingInfo.state, myorder.response.shippingInfo.country).name}, {Country.getCountryByCode(myorder.response.shippingInfo.country).name}-{myorder.response.shippingInfo.pinCode}</p>
              </div>
              <div className="w-100 text-white p-2 overflow-auto" style={{height: "80vh"}}>
                  <h3 style={{color: "#00bcd4"}}>Items:</h3>
                  {myorder.response.orderItems.map((e)=>{
                   return <div key={e.product} className="d-flex w-100 justify-content-center align-items-center" style={{height: "25vh",  borderBottom: "1px solid white"}}>
                       <img src={e.image.url} alt="image1" style={{height: "80%", width: "20%"}} />
                       <div className="d-flex flex-column p-2" style={{height: "80%", width: "40%", }}><h3>{(e.name.length > 20) ? `${(e.name).slice(0, 20)}...`: e.name}</h3>
                       <p>{(e.desc.length > 50) ? `${(e.desc).slice(0, 50)}...` : e.desc}</p></div>
                       <div className="d-flex justify-content-end align-items-center" style={{height: "80%", width: "40%", }}><h3>{e.quantity} X {e.price}<i className="fa-solid fa-indian-rupee-sign fa-fade"></i> =  {e.quantity * e.price}<i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h3></div>
                   </div>
})            }
              </div>
      </div>
          <div className="d-flex w-25 flex-column justify-content-between" style={{height: "70vh", }}>
          <div className="d-flex w-100 p-3 flex-column text-white align-items-end">
          <h3 className="w-100" style={{color: "#00bcd4"}}>Pricing: </h3>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Price: </span><p>{myorder.response.itemPrice.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Tax 18%: </span><p>{myorder.response.taxPrice.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-5 fw-bold">Shipping Charge: </span><p>{myorder.response.shippingPrice} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></p></div>
          <div className="w-50" style={{borderTop: "4px solid #3dbbd2"}}></div>
          <div className="w-100 d-flex justify-content-between"><span className="fs-4 fw-bold">Total Coast: </span><h5>{myorder.response.totalPrice} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h5></div>
          <div className="my-3 w-100 d-flex justify-content-center">
          </div>
          </div>
          </div>
      </div>


      </div>
    </div>
  </div>
</div>}
    {context.user.success && status && 
    <div className="w-100 d-flex justify-content-center align-items-center" style={{marginTop: "63px", height: "100vh"}}>
       <div className="rounded overflow-auto" style={{height: "80%", width: "80%", backgroundColor : "rgba(30, 32, 44, 0.95)"}}>
          <div className='d-flex w-100 align-items-center rounded-top' style={{height: "10vh", backgroundColor: "#3dbbd2"}}>
            <h4 className="text-center" style={{width: "35%"}}>OrderID</h4>
            <h4 className="text-center" style={{width: "20%"}}>Price</h4>
            <h4 className="text-center" style={{width: "20%"}}>Status</h4>
            <h4 className="text-center" style={{width: "15%"}}>Cancel-Order</h4>
            <h4 className="text-center" style={{width: "10%"}}>View</h4>
          </div>
           {orders.length !== 0 && 
            orders.map((e)=>{
                return <OrderItem key={e._id} item={e} getOrder={getOrder} deleteOrder={deleteOrder}/>
            })
           }
           {
            orders.length === 0 &&
            <div className="d-flex justify-content-center align-items-center text-white" style={{height: "70vh"}}>
            <h1>No Orders to show</h1>
            </div>
           }
       </div>
    </div>}
     {!context.user.success && <Error404 margin={"63px"}/>}
    </div>
  )
}
