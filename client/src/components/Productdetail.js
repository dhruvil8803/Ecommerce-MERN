import React, { useContext, useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import Context from "../contextApi/Context";
import ReactStars from "react-rating-stars-component";
import Review from "./Review"
import Carousel from 'react-material-ui-carousel'
import Spinner from "./Spinner";
import { useAlert } from "react-alert";
import Rating from '@mui/material/Rating';

export default function Productdetail() {
  let { id } = useParams();
  let ref = useRef(null);
  let context = useContext(Context);
  let [detail, setDetail] = useState({})
  let [status, setStatus] = useState(false);
  let [quantity, setQuantity] = useState(1);
  let [review , setReview] = useState("");
  let [rating, setRating] = useState(5);
  let changeReview = (e)=>{
      setReview(e.target.value);
  }
  let alert = useAlert();
  let check = async () => {
    let response = await context.fetchApi("", "POST", `api/products/showProduct/${id}`, "multipart/form-data");
    setDetail(response.response);
    setStatus(true);
  }
  let checkOut = ()=>{
    let z =  detail.reviews.find((e)=>(e.by.toString() === context.user.response._id));
    return z ? true : false;
  }
  useEffect(() => {
    setStatus(false);
    check();
    // eslint-disable-next-line
  }, []);
  let increaseQuantity = ()=>{
     if(quantity >= detail.stock) return;
     setQuantity(quantity + 1);
  }
  let decreaseQuantity = ()=>{
    if(quantity === 1) return;
    setQuantity(quantity - 1);
 }
let addToCart = ()=>{
  context.addToCart(detail, quantity);
  alert.success("Product added to cart");
}
let deleteReview = async ()=>{
  let response = await context.fetchApi("", "DELETE", `api/products/deleteReview/${id}`, "application/json");
  if(response){
    setStatus(false);
      check();
    alert.success("Review Deleted Successfully");
  }
}

let openModal = ()=>{
     ref.current.click();
}
let addReview = async ()=>{
   let response = await context.fetchApi({name: context.user.response.name, desc : review, rating,id}, "POST", "api/products/addReview", "application/json")
   if(response){
    setStatus(false);
    check();
    alert.success("Review added successfully");
   }
  ref.current.click();
}
  return (
    // <>
    <div>



<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Review</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <label htmlFor="rating" className="form-label">Rating:</label>
      <Rating name="simple-controlled" onChange={(e, val)=>{setRating(val)}} sx={{color: "grey", fontSize: "40px"}}/>
      <br />
      <label htmlFor="review" className="form-label">Review:</label>
  <textarea defaultValue={review} onChange={changeReview} className="form-control text-white p-2" style={{backgroundColor: "black"}} id="review" name="review" required/>
      </div>
      <div className="modal-footer">
        {context.user.success && status && <button disabled={!review} type="button" onClick={addReview} className="btn btn-primary">{checkOut() ? "Update" : "Add"}</button>}
      </div>
    </div>
  </div>
</div>
  


      {status && 
        <div>
          <div
            className="d-flex w-100 align-items-center justify-content-around"
            style={{ height: "90vh", marginTop: "20vh", marginBottom: "5vh" }}
          >
            <div
              className="d-flex align-items-center justify-content-around"
              style={{ height: "100%", width: "40%" }}
            >
              <div
                style={{
                  height: "80%",
                  width: "80%",
                }}
              >
                <Carousel>
                  {
                  detail.images.map((e)=>{
                    return <img key={e.public_id}className="h-100 w-100" src={e.url} alt="productimages" style={{ objectFit: "cover", objectPosition: "center" }} />
                  })
                }
                </Carousel>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-around"
              style={{ height: "100%", width: "60%" }}
            >
              <div
                className="d-flex flex-column p-4 text-white rounded overflow-auto"
                style={{
                  height: "90%",
                  width: "50%",
                  backgroundColor: "rgba(30, 32, 44, 0.95)",
                  overflowWrap: "break-word"
                }}
              >
                <h2 className="my-3" style={{
                  backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "250%",
                  fontSize: "25px",
                  fontWeight: "bold"
                }}>{detail.name}</h2>
                <p>{detail.desc}</p>
                <div>
                  <ReactStars value={detail.rating} {...{
                    edit: false,
                    isHalf: true,
                    color: "grey",
                    // value: detail.rating,
                    activeColor: "yellow",
                    size: 25,
                  }} />
                
                  <p>
                    <span>{detail.numberOfReview}</span> Reviews
              </p>
                </div>
                <div className="fs-6 fw-bold">
                  Status:{
                    (detail.stock === 0) ?
                      <span style={{ color: "red" }}>Out of stock
              </span> :
                      <span style={{ color: "green" }}>Available
              </span>}
                </div>
                <div className="fs-5 fw-bold">
                  Price:
              <div className="fs-3" style={{ color: "#00bcd4" }}>
                    {detail.price}
                    <i className="fa-solid fa-indian-rupee-sign fa-fade"></i>
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center my-2">
                  <div className="fs-6 fw-bold">Quantity:   </div>
                  <button onClick={decreaseQuantity} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}>-</button>
                  <div className="bg-white text-black mx-3 p-2 text-center" style={{ width: "40px" }}>{quantity}</div>
                  <button onClick={increaseQuantity} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}>+</button>
                </div>
                <div className="d-flex justify-content-start my-2">
                  <button type="button" onClick={addToCart} disabled={detail.stock === 0} className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}><i className="fa-solid fa-cart-plus"></i> Add to cart</button>
                 { context.user.success && <button type="button" onClick={openModal} className="btn btn-primary text-black mx-2" style={{ backgroundColor: "#3dbbd2" }}><i className="fa-solid fa-plus"></i> {checkOut() ? "Update Review" : "Add Review"}</button>}
                </div>
                  {context.user.success && <button type="button" disabled={!checkOut()} onClick={deleteReview} className="btn btn-danger text-black" style={{width: "45%"}}><i className="fa-solid fa-trash-can"></i> Delete Review</button>}
              </div>
            </div>
          </div>
          <h1 className="text-white text-center">Reviews</h1>
          {
            (detail.reviews.length === 0) ?
              <h3 className="text-white text-center">No Reviews yet.</h3>
              : <div
                className="my-3 d-flex overflow-auto"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {detail.reviews.map((e) => {
                  return <Review review={e} key={e.by} />
                })}
              </div>
          }
        </div>}
      {!status && <Spinner margin={"100px"}/>}
    </div>
  );
}
