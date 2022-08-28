import React from 'react'
export default function AdminUser({user, deleteUser, changeRole}) {
  return (
    <div className='d-flex align-items-center text-white' style={{height: "15vh", borderBottom: "1px solid white"}}>
        <div className="d-flex justify-content-center align-items-center h-100" style={{width:"10%"}}><img className="rounded-circle" style={{height: "90%", width:"90%"}} src={user.avatar.url} alt="profile" /></div>
        <div className="text-center" style={{width:"35%"}}><span className='fs-6 fw-bold fst-italic' style={{color: "#00bcd4"}}>{user.email}</span></div>
        <div className="text-center" style={{width:"20%"}}><span className='fs-6 fw-bold'>{user.name}</span></div>
        <div className="text-center" style={{width:"15%"}}><span className='fs-6 fw-bold fst-italic' style={{color: (user.role === "admin" ? "green": "red")}}>{user.role}</span></div>
        <div className="d-flex justify-content-center" style={{width:"10%"}}><div className="text-dark d-flex align-items-center justify-content-center rounded" onClick={()=>changeRole(user._id, user.role)} style={{cursor: "pointer", height: "40px", width:"40px", backgroundColor: "#03dac5"}}><i class="fa-solid fa-user-pen"></i></div>
    </div>
        <div className="d-flex justify-content-center" style={{width:"10%"}}><div className="text-dark d-flex align-items-center justify-content-center rounded bg-danger" onClick={()=>deleteUser(user._id)}style={{cursor: "pointer", height: "40px", width:"40px"}}><i class="fa-solid fa-trash"></i></div>
    </div>
    </div>
  )
}
