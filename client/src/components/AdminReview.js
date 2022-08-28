import React from 'react'

export default function AdminReview({item, deleteReview}) {
  return (
    <div className='d-flex align-items-center text-white' style={{height: "10vh", borderBottom: "1px solid white"}}>
    <div className="text-center" style={{width:"25%"}}><span className='fs-6 fw-bold' style={{color: "#00bcd4"}}>{item.by}</span></div>
    <div className="text-center" style={{width:"15%"}}> <p className='text-break fw-bold'>{item.name}</p>
                 </div>
    <div className="text-center" style={{width:"40%"}}> <p className='text-break fw-bold'>{(item.desc.length > 50) ? `${(item.desc).slice(0, 50)}...`: item.desc}</p>
                 </div>
    <div className="text-center" style={{width:"10%"}}><span className='fs-6 fw-bold fst-italic' style={{color: (item.rating <= 2.5) ? "red" : "green"}}>{item.rating}</span></div>
    <div className="d-flex justify-content-center" style={{width:"10%"}}><div onClick={()=>deleteReview(item.by)}className="text-dark d-flex align-items-center justify-content-center rounded bg-danger" style={{cursor: "pointer", height: "40px", width:"40px"}}><i className="fa-solid fa-trash"></i></div>
</div>
</div>
  )
}
