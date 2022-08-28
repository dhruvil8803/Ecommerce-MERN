import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
export default function Steppers({active}) {
  return (
    <div className="my-3" style={{height: "20vh"}}>
    <div className="w-100 d-flex justify-content-center align-items-center my-2" style={{marginTop: "30px"}}>
      <div className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{backgroundColor: (active < 0) ? "#212529" : "#3dbbd2",height: "60px", width: "60px"}}><LocalShippingIcon sx={{fontSize: "40px"}}/></div>
      <div style={{height: "10px", width: "30%", backgroundColor: (active < 1) ? "#212529" : "#3dbbd2"}}></div>
      <div className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{backgroundColor: (active < 1) ? "#212529" : "#3dbbd2",height: "60px", width: "60px"}}><LibraryAddCheckIcon sx={{fontSize: "40px"}}/></div>
      <div style={{height: "10px", width: "30%", backgroundColor: (active < 2) ? "#212529" : "#3dbbd2"}}></div>
      <div className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{backgroundColor: (active < 2) ? "#212529" : "#3dbbd2",height: "60px", width: "60px"}}><CreditScoreIcon sx={{fontSize: "40px"}}/></div>
    </div>
    <div className="w-100 d-flex justify-content-center align-items-center">
      <h4 className="text-white">Shipping Info</h4>
      <div style={{height: "1px", width: "23%", backgroundColor: "black"}}></div>
      <h4 className="text-white">Confirm Order</h4>
      <div style={{height: "1px", width: "23%", backgroundColor: "black"}}></div>
      <h4 className="text-white">Payment</h4>
    </div>
    </div>
  )
}
