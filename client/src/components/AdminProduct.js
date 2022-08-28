import React from 'react'
import {useNavigate } from 'react-router-dom'
export default function AdminProduct({item, deleteProduct}) {
  let navigate = useNavigate();
  let view = ()=>{
    navigate(`/productdetail/${item._id}`)
  }
  let editProduct = (id)=>{
    navigate(`/admin/editProduct/${id}`)
  }
  let showReview = (id)=>{
    navigate(`/admin/allreviews/${id}`)
  }
  return (
    <div className="d-flex w-100 text-white" style={{borderBottom : "1px solid white", height: "20vh"}}>

    <div className="d-flex justify-content-evenly align-items-center" style={{height: "20vh", width: "55%"}}>
        <div style={{height: "90%", width:"25%" }}>
            <img src={item.images[0].url} alt="productiamge" className="w-100 h-100" />
        </div>
        <div style={{height: "90%", width:"70%", }}>
        <h4>{(item.name.length > 20) ? `${(item.name).slice(0, 20)}...`: item.name}</h4>
        <p className='text-break'>{(item.desc.length > 75) ? `${(item.desc).slice(0, 75)}...`: item.desc}</p>
                 
        </div>
    </div>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "20vh", width: "15%"}}><span className='fs-6 fw-bold'>{item.price} <i className="fa-solid fa-indian-rupee-sign"></i></span></div>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "20vh", width: "10%"}}><span className='fs-6 fw-bold'>{item.stock}</span></div>
    <div className="d-flex justify-content-evenly align-items-center" style={{ height: "20vh", width: "20%"}}>
    <div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={view} style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "rgb(158 234 249)"}}><i className="fa-solid fa-eye"></i></div>
    <div className="text-dark d-flex align-items-center justify-content-center rounded bg-danger" onClick={()=>deleteProduct(item._id)} style={{cursor: "pointer", height: "40px", width:"40px"}}><i className="fa-solid fa-trash"></i></div>
    <div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={()=>editProduct(item._id)} style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "#03dac5"}}><i className="fa-solid fa-pen"></i></div>
    <div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={()=>showReview(item._id)}style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "#BB86FC"}}><i class="fa-solid fa-comment"></i></div>
    </div>
    </div>
  )
}
