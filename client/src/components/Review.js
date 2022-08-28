import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useEffect } from 'react';
import Context from '../contextApi/Context';
import { useContext } from 'react';
export default function Review(props) {
  let context = useContext(Context);
     let [image, setImage] = useState({});
     let [status, setStatus] = useState(false);
     let review = props.review;
     useEffect(()=>{
      let check = async()=>{
           let response = await context.fetchApi("", "GET", `api/users/userImage/${review.by}`, "");
           setImage(response.response);
           setStatus(true);
      }
      check();
      // eslint-disable-next-line
     }, []);
    let option = {
        edit: false,
        value: review.rating,
        isHalf: true,
        color: "grey",
        activeColor: "yellow",
        size: 35,
      };
  return (
    status &&
    <div style={{display:"inline-table"}}>

    <div className="d-flex flex-column p-3 text-white rounded mx-2" style={{height: "55vh",width:"250px", backgroundColor:"rgba(30, 32, 44, 0.95)"}}>
        <div className="my-2 d-flex justify-content-center align-items-center w-100 h-50">
          <img className="rounded-circle" src={image.avatar.url} alt="Review" style={{height:"80px", width: "80px"}}/>
        </div>
        <h5 className="text-center">{image.name}</h5>
        <div className="mx-auto"> <ReactStars {...option} /></div>
        <textarea disabled className="rounded p-2 overflow-hidden text-white" style={{maxWidth:"100%", backgroundColor: "black" ,overflowWrap: "break-word", outline:"none"}} defaultValue={review.desc}></textarea>
    </div>
    </div>
  )
}
