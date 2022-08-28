import React from 'react';
import {Link} from 'react-router-dom';
export default function SideNavbar({active}) {
  return (
    <div>
      <div className="d-flex flex-column text-white py-5" style={{width : "20vw" }}>

          <div className= "p-2 w-100" style={{backgroundColor: (active === 1) ? "#3dbbd2" : "black", borderRadius: "0 20% 20% 0"}}>
              <Link to="/admin/dashboard" className="my-1 fs-5 fw-bold nav-link"><i class="fa-solid fa-chart-simple"></i> Dashboard</Link>
            </div>
            <hr style={{border: "0.5px solid white"}}/>
    <div className="w-100 p-2 d-flex justify-content-between" style={{backgroundColor: (active === 2) ? "#3dbbd2" : "black", borderRadius: "0 20% 20% 0"}} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    <p className="fs-5 fw-bold"><i class="fa-solid fa-tag"></i> Product</p>
    <p className="fs-5 fw-bold">v</p>
  </div>
<div className="collapse" id="collapseExample">
  <div className="card card-body" style={{backgroundColor: "black"}}>
  <div className= "p-2 w-100 rounded" style={{backgroundColor: (active === 21) ? "#3dbbd2" : "black"}}>
              <Link to="/admin/allproducts" className="my-1 fs-6 fw-bold nav-link"><i class="fa-solid fa-pen"></i> Product Actions</Link>
              </div>
              <div className= "p-2 w-100 rounded" style={{backgroundColor: (active === 22) ? "#3dbbd2" : "black"}}>
              <Link to="/admin/addProduct" className="my-1 fs-6 fw-bold nav-link"><i class="fa-solid fa-plus"></i> Add Products</Link>
              </div>
  </div>
</div>
  <hr style={{border: "0.5px solid white"}}/>

          <div className="w-100 p-2" style={{backgroundColor: (active === 3) ? "#3dbbd2" : "black", borderRadius: "0 20% 20% 0"}}>
              <Link to="/admin/allusers" className="my-1 fs-5 fw-bold nav-link"><i class="fa-solid fa-user"></i> Users</Link>
            </div>
            <hr style={{border: "0.5px solid white"}}/>
          <div className="w-100 p-2" style={{backgroundColor: (active === 4) ? "#3dbbd2" : "black", borderRadius: "0 20% 20% 0"}}>
              <Link to="/admin/allorders" className="my-1 fs-5 fw-bold nav-link"><i class="fa-solid fa-list"></i> Orders</Link>
            </div>
            <hr style={{border: "0.5px solid white"}}/>
      </div>
    </div>
  )
}
