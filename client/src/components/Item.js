import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Hover.css";
export default function Item(props) {
  let product = props.value;
  let option ={
    edit: false,
     value: product.rating,
     isHalf : true,
     color: "grey",
     activeColor: "yellow",
     size: 25

  }
  return (
    <div className={`col-md-${props.cell}`}>
    <div className="card my-2 productItem" style={{backgroundColor:"rgba(30, 32, 44, 0.95)"}}>
  <img src={product.images[0].url} className="card-img-top" alt="xyz" />
  <div className="card-body text-white">
    <h5 className="card-title">{product.name.length > 15 ? `${product.name.slice(0, 15)}...` : product.name}</h5>
    <p className="card-text">{product.desc.length > 50 ? `${product.desc.slice(0, 50)}...` : product.desc}</p>
    <div className='fs-6 fw-bold'>Price: <span style={{color: "#00bcd4"}}>{product.price} <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></span></div>
    <div>
      <ReactStars {...option}/> 
      <p><span>{product.numberOfReview}</span> Reviews</p>
    </div>
    <Link to={`/productdetail/${product._id}`} className="btn" style={{backgroundColor: "#3dbbd2"}}>View</Link>
  </div>
</div>
</div>
  )
}
