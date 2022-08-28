import React, { useContext, useEffect, useState} from 'react'
import { useParams} from "react-router-dom";
import Context from "../contextApi/Context";
import { useAlert } from 'react-alert';
import AdminReview from './AdminReview';
import Error404 from "./Error404";
export default function Allreviews() {
  let { id } = useParams();
  let alert = useAlert();
  let context = useContext(Context);
  let [review, setReview] = useState(false);
  let check = async()=>{
      let response = await context.fetchApi("", "GET", `api/products/showReview/${id}`);
      if(!response) return;
       setReview(response.response);
  }
  useEffect(()=>{
    check(); 
    // eslint-disable-next-line
  }, []);
  let deleteReview = async(by)=>{
      let response = await context.fetchApi("", "DELETE",  `api/products/admin/deleteReviews?id=${id}&by=${by}`);
      if(response){
        alert.success("Review Deleted Successfully");
        check();
      }
  }
  return (
    <div style={{marginTop: "63px"}}>
    {context.user.success && context.user.response.role === "admin"  &&  review &&
        <div className="p-3 d-flex justify-content-center align-items-center w-100" style={{height: "120vh"}} >
         <div className="rounded overflow-auto" style={{height: "90%", width: "80%", backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
         <div className='w-100 d-flex align-items-center rounded-top' style={{height: "10vh", backgroundColor: "#3dbbd2"}}>
            <h4 className="text-center" style={{width: "25%"}}>By</h4>
            <h4 className="text-center" style={{width: "15%"}}>Name</h4>
            <h4 className="text-center" style={{width: "40%"}}>Descreption</h4>
            <h4 className="text-center" style={{width: "10%"}}>Rating</h4>
            <h4 className="text-center" style={{width: "10%"}}>Delete</h4>
          </div>
          {
            review.map((e)=>{
              return <AdminReview key={e.by} item={e} deleteReview={deleteReview}/>
            })
          }
          {
            review.length === 0 &&
            <div className="d-flex justify-content-center align-items-center text-white" style={{height: "70vh"}}>
            <h1>No Reviews to show</h1>
            </div>
           }
         </div>
     </div>
     }
     {!context.user.success || context.user.response.role !== "admin" ? <Error404 margin={"0px"}/> : ""}
  </div>
  )
}
