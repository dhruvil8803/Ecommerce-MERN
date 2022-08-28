import React, { useContext, useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import {Line, Doughnut, Pie} from "react-chartjs-2";
import {Chart,CategoryScale,LinearScale,PointElement,LineElement, Title,Tooltip, Legend , ArcElement} from "chart.js";
import {Link} from "react-router-dom";
import Context from "../contextApi/Context";
import Error404 from "./Error404";
Chart.register(CategoryScale,LinearScale,PointElement,LineElement , Title,Tooltip, Legend, ArcElement)
export default function Dashboard() {
  let context = useContext(Context);
  let [product, setProduct] = useState(false);
  let [order, setOrder] = useState(false);
  let [user, setUser] = useState(false);
  let inStock = 0;
  let outStock = 0;
  let totalPrice = 0;
  let price = 0;
  let tax = 0;
  let shipping = 0;
  
  let processing = 0;
  let shipped = 0;
  let delivered = 0;
  product && product.forEach((e)=>{
     if(e.stock !== 0) inStock++;
     else outStock++;
  })
  order && order.forEach((e)=>{
      if(e.orderStatus === "Processing") processing++;
      else if(e.orderStatus === "Delivered") {
        delivered++;
        totalPrice += e.totalPrice;
        price += e.itemPrice;
        tax += e.taxPrice;
        shipping += e.shippingPrice;
      }
      else shipped++;

  })
  useEffect(()=>{
    let check = async ()=>{
      let response = await context.fetchApi("", "GET", "api/products/admin/showAllProduct", "application/json");
      if(!response) return;
       setProduct(response.response);
       response = await context.fetchApi("", "GET", "api/orders/admin/showAllOrder", "application/json");
       if(!response) return;
       setOrder(response.response);
       response = await context.fetchApi("", "GET", "api/users/admin/showAllUser", "application/json");
       if(!response) return;
       setUser(response.response);
    }
    check();
    // eslint-disable-next-line
  }, []);
    const lineState = {
        labels : ["Initial Amount", "Shipping Charges", "Tax 18%", "Product Price", "Total Price"],
        datasets : [{
            label: "Total Amount",
            data: [0, shipping, tax, price, totalPrice],
            borderColor: "#3dbbd2",
            backgroundColor : "#3dbbd2",
            hoverBackgroundColor : "#03dac5"
        }]
    }
   const options = {
        scales: {
          x: {
            grid: {
                color: "grey",
              tickColor: 'white',
              borderColor: "white",
            },
            ticks: {
              color: '#ff0266',
            }
          },
          y: {
            grid: {
                borderColor: "white",
                color: "grey",
              tickColor: 'white'
            },
            ticks: {
              color: '#ff0266',
            }
          }
        }
      };

    const doughnutState = {
        labels : ["Processing", "Shipped", "Delivered"],
        datasets : [{
            data: [processing, shipped, delivered],
             backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
        }]
    }
    const pie = {
        labels : ["OutOfStock", "In Stock"],
        datasets : [{
            data: [outStock, inStock],
             backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
              hoverOffset: 4
        }]
    }
  return (
    <div style={{margin: "63px 0px"}}>
      {context.user.success && context.user.response.role === "admin"  && order && product && user &&
       <div className="d-flex w-100">
          <SideNavbar active={1}/>
          <div className="p-3" style={{width: "80vw", borderLeft: "2px solid white"}} >
          <h2 className="text-center text-white">
        Dashboard
         </h2>
         <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
         <div className="my-3 d-flex flex-column bg-danger p-3 rounded">
             <div className="d-flex justify-content-between">
                <p className="fs-4 fw-bold text-white">Total Revenue:</p>
                <p className="fs-5 fw-bold text-white">{totalPrice} <i className="fa-solid fa-indian-rupee-sign"></i></p>
            </div>
             <div className="d-flex justify-content-between">
                <p className="fs-4 fw-bold text-white">Total Tax:</p>
                <p className="fs-5 fw-bold text-white">-{tax.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign"></i></p>
            </div>
             <div className="d-flex justify-content-between">
                <p className="fs-4 fw-bold text-white">Total ShippingCharges:</p>
                <p className="fs-5 fw-bold text-white">-{shipping} <i className="fa-solid fa-indian-rupee-sign"></i></p>
            </div>
            <div className="d-flex justify-content-end">
                <div style={{width: "20%", borderTop: "2px solid white"}}></div>
            </div>
             <div className="d-flex justify-content-between">
                <p className="fs-4 fw-bold text-white">Products Price:</p>
                <p className="fs-5 fw-bold text-white">{price.toFixed(2)} <i className="fa-solid fa-indian-rupee-sign"></i></p>
            </div>
         </div>
         <h2 className="text-center text-white">
        Statastics
         </h2>
         <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
         <div className="d-flex justify-content-center my-3">
             <div className="d-flex flex-column justify-content-center align-items-center rounded-circle text-white mx-3" style={{backgroundColor: "#BB86FC", width:"150px", height:"150px"}}><Link to="/admin/allusers" className="nav-link fs-5 fw-bold">Users</Link>
             <Link to="/admin/allusers" className="nav-link fs-5 fw-bold">{user.length}</Link></div>
             <div className="d-flex flex-column justify-content-center align-items-center rounded-circle text-white mx-3" style={{backgroundColor: "#ff0266", width:"150px", height:"150px"}}><Link to="/admin/allproducts" className="nav-link fs-5 fw-bold">Products</Link>
             <Link to="/admin/allproducts" className="nav-link fs-5 fw-bold">{product.length}</Link></div>
             <div className="d-flex flex-column justify-content-center align-items-center rounded-circle text-white mx-3" style={{backgroundColor: "#03dac5", width:"150px", height:"150px"}}><Link to="/admin/allorders" className="nav-link fs-5 fw-bold">Orders</Link>
             <Link to="/admin/allorders" className="nav-link fs-5 fw-bold">{order.length}</Link></div>
         </div>
         <h2 className="text-center text-white">
        Income
         </h2>
         <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
         <div className="d-flex justify-content-center">
           <div className="p-3 rounded h-50 w-75" style={{backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
            <Line data={lineState} options={options}/>
           </div>
         </div>
         <div className="d-flex my-3 w-100">
             <div className="w-50 d-flex flex-column justify-content-center align-items-center">
             <h2 className="text-center text-white">Orders </h2>
              <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
         <div style={{width: "80%"}}><Doughnut data={doughnutState}/></div>
             </div>
             <div className="w-50 d-flex flex-column justify-content-center align-items-center">
             <h2 className="text-center text-white">Products </h2>
              <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
         <div style={{width: "80%"}}><Pie data={pie}/></div>
             </div>
         </div>
          </div>
       </div>}
       {!context.user.success || context.user.response.role !== "admin" ? <Error404 margin={"0px"}/> : ""}
    </div>
  )
}
