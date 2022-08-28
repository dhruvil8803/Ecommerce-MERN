import React from 'react'

export default function Footer() {
  return (
    <div className="d-flex bg-dark w-100" style={{height:"30vh"}}>
     <div className="w-50 h-100 d-flex justify-content-center align-items-center">
         <div className="w-100 h-75 text-white" style={{borderRight: "2px solid white" ,
         textAlign : "center"}}> 
         <h1 style={{
             backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
             WebkitBackgroundClip: "text",
             WebkitTextFillColor: "transparent",
             backgroundSize: "250%",
         }}>
            E-commerce
         </h1>
         <p>All rights reserved 2022</p>
         </div>
         </div>
     <div className="text-white d-flex flex-column w-50 justify-content-center align-items-center">
        <h4>
            Connect with me on:
        </h4>
        <a className="nav-link active fs-5 fw-bold" style={{color: "#3dbbd2"}}href="https://www.linkedin.com/in/dhruvil-patel-580759204">Linkdin <i className="fa-brands fa-linkedin fa-flip"></i></a>
        <a className="nav-link active fs-5 fw-bold" style={{color: "#3dbbd2"}}href="https://github.com/dhruvil8803" >Github <i className="fa-brands fa-github fa-flip"></i></a>
        <a className="nav-link active fs-5 fw-bold" style={{color: "#3dbbd2"}}href="https://www.instagram.com/dhruvil_8803/">Instagram <i className="fa-brands fa-square-instagram fa-flip"></i></a>
     </div>
    </div>
  )
}
