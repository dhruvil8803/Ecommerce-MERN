import React, { useEffect } from 'react';
import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Context from "../contextApi/Context";
export default function Navbar() {
  let navigate = useNavigate()
  let context = useContext(Context);
   let {success} = context.user;
  useEffect(()=>{
    let check = async()=>{
   await context.fetchUser();
  }
  check();
  // eslint-disable-next-line
  }, []);
let profile = ()=>{
  navigate("/profile");
}

  return (
<nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "250%",
    fontSize: "25px",
    fontWeight: "bold"}}>E-commerce</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" style={{color: "white"}}><i className="fa-solid fa-house fa-beat"></i> Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/product" style={{color: "white"}}><i className="fa-brands fa-shopify fa-beat"></i> All Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" style={{color: "white"}}><i className="fa-solid fa-cart-shopping fa-beat"></i> Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myorder" style={{color: "white"}}><i className="fa-solid fa-file-invoice fa-beat"></i> My Orders</Link>
        </li>
       {context.user.success && context.user.response.role === "admin" && <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard" style={{color: "white"}}><i className="fa-solid fa-gauge fa-beat"></i> Dashboard</Link>
        </li>}
      </ul>
     <div className="d-flex"> 
     {success && <img src={context.user.response.avatar.url} alt="image1" className="rounded-circle mx-2" style={{height: "40px", width : "40px", cursor: "pointer"}} onClick={profile}/>}
     
     {success && 
     <button onClick={context.logout} type="button" className="btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}><i className="fa-solid fa-right-from-bracket fa-beat"></i> Logout</button>}
      {!success && <Link type="button" to="/loginPage" className="btn btn-primary text-black mx-1" style={{backgroundColor: "#3dbbd2"}}><i className="fa-solid fa-right-to-bracket fa-beat"></i> Login</Link>}
     {!success && <Link type="button"  to="/signupPage" className="btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}><i className="fa-solid fa-user-plus fa-beat"></i> Signup</Link>}
      </div>
    </div>
  </div>
</nav>
  )
}
