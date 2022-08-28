import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
export default function OrderItem({item, getOrder, deleteOrder}) {
  return (
    <div className='d-flex align-items-center text-white' style={{height: "10vh", borderBottom: "1px solid white"}}>
        <div className="text-center" style={{width:"35%"}}><span className='fs-6 fw-bold' style={{color: "#00bcd4"}}>{item._id}</span></div>
        <div className="text-center" style={{width:"20%"}}><span className='fs-6 fw-bold'>{item.totalPrice}<i className="fa-solid fa-indian-rupee-sign"></i></span></div>
        <div className="text-center" style={{width:"20%"}}><span className='fs-6 fw-bold fst-italic' style={{color: (item.orderStatus === "Processing") ? "red" : (item.orderStatus === "Shipped") ? "blue" : "green"}}>{item.orderStatus}</span></div>
        <div className="text-center" style={{width:"15%"}}><div className="text-dark p-2 d-inline rounded bg-danger" onClick={()=>deleteOrder(item._id)} style={{cursor: "pointer"}}><DeleteIcon /></div></div>
        <div className="text-center" style={{width:"10%"}}><div className="text-dark p-2 d-inline rounded" onClick={()=>getOrder(item._id)} style={{cursor: "pointer", backgroundColor: "rgb(158 234 249)"}}><RemoveRedEyeIcon /></div></div>
    </div>
  )
}
