import React, {useContext} from 'react' 
import Context from '../contextApi/Context';
import CartItem from './CartItem';
import {Link} from "react-router-dom"
export default function Cart() {
    let context = useContext(Context);
  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{marginTop: "63px", height: "100vh"}}>
        <div className="rounded overflow-auto" style={{height: "80%", width: "80%", backgroundColor : "rgba(30, 32, 44, 0.95)"}}>
        <div className="d-flex w-100 align-items-center rounded-top" style={{height: "10vh", backgroundColor : "#3dbbd2"}}>
            <h4 className="text-center" style={{width:"66%"}}>Products</h4>
            <h4 className="text-center" style={{width:"17%"}}>Quantity</h4>
            <h4 className="text-center" style={{width:"17%"}}>Price</h4>
        </div>
           {context.cart.length !== 0 && <div> {
            context.cart.map((e)=>{
                return <CartItem key={e._id} item={e} />})
            }
        <div className="d-flex w-100 justify-content-end align-items-center" style={{height: "20vh", backgroundColor : "rgba(30, 32, 44, 0.95)"}}>
            <div className='d-flex text-white' style={{width: "34%"}}>

            <h2 className="text-center pt-3" style={{width:"50%", borderTop:"5px solid #3dbbd2"}}>Gross Total:</h2>
            <h3 className="text-center pt-3" style={{width:"50%", borderTop:"5px solid #3dbbd2"}}>{context.cart.reduce((acc, e)=> acc + e.quantity * e.price, 0)} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h3>
            </div>
        </div>
         
        <div className="d-flex w-100 justify-content-end align-items-center" style={{height: "20vh", backgroundColor : "rgba(30, 32, 44, 0.95)"}}>
            <div className="w-25 d-flex justify-content-center">
        <Link to="/shippingInfo" type="button" className="btn btn-primary text-black px-5" style={{ backgroundColor: "#3dbbd2" }}>Check Out</Link>
            </div>
        </div>
        </div>}
        {context.cart.length === 0 && <div className="d-flex justify-content-center align-items-center text-white" style={{height: "70vh"}}>
            <h1>No Product to show</h1>
            </div>}
        </div>
        </div>
  )
}
