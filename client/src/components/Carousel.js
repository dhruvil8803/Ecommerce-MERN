import React from 'react'
import image2 from "../images/image2.jpg"
import image5 from "../images/image5.jpg"
import image6 from "../images/image6.jpg"
import image3 from "../images/image3.jpg"
export default function Carousel() {
  return (
    <div style={{marginTop : "63px"}}>
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{height : "90vh"}}>
  {/* <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div> */}
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={image2} className="d-block w-100 opacity-75" alt="..." style={{height: "90vh", objectFit: "cover", objectPosition: "center"}}/>
      <div className="carousel-caption d-none d-md-block text-white">
        <h3>Welcome To Ecommerce Site.</h3>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={image6} className="d-block w-100 opacity-75" alt="..." style={{height: "90vh", objectFit: "cover", objectPosition: "bottom"}}/>
      <div className="carousel-caption d-none d-md-block text-white">
        <h3>Find Awesome Products.</h3>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={image3} className="d-block w-100 opacity-75" alt="..." style={{height: "90vh", objectFit: "fill"}}/>
      <div className="carousel-caption d-none d-md-block text-white">
        <h3>Best and Trending Fashions.</h3>
      </div>
    </div>
    <div className="carousel-item">
      <img src={image5} className="d-block w-100 opacity-75" alt="..." style={{height: "90vh", objectFit: "fill", objectPosition: "left"}} />
      <div className="carousel-caption d-none d-md-block text-white">
        <h3>With Best Prices and Offers.</h3>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
  )
}
