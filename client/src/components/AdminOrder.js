import React from 'react'

export default function AdminOrder({item, getOrder, updateStatus}) {
  return (
    <div className='d-flex align-items-center text-white' style={{height: "10vh", borderBottom: "1px solid white"}}>
        <div className="text-center" style={{width:"40%"}}><span className='fs-6 fw-bold' style={{color: "#00bcd4"}}>{item._id}</span></div>
        <div className="text-center" style={{width:"20%"}}><span className='fs-6 fw-bold'>{item.totalPrice}<i className="fa-solid fa-indian-rupee-sign"></i></span></div>
        <div className="text-center" style={{width:"20%"}}><span className='fs-6 fw-bold fst-italic' style={{color: (item.orderStatus === "Processing") ? "red" : (item.orderStatus === "Shipped") ? "blue" : "green"}}>{item.orderStatus}</span></div>
        <div className="d-flex justify-content-center" style={{width:"10%"}}><div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={()=>updateStatus(item._id)}style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "#03dac5"}}><i class="fa-solid fa-rotate fa-spin"></i></div>
    </div>
        <div className="d-flex justify-content-center" style={{width:"10%"}}><div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={()=>getOrder(item._id)} style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "rgb(158 234 249)"}}><i className="fa-solid fa-eye"></i></div>
    </div>
    </div>
  )
}
