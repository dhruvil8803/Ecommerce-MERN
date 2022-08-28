import React from 'react'
import image from "../images/404error.jpg"
export default function Error404({margin}) {
  return (
    <div className="w-100" style={{height: "90vh", marginTop: margin}}>
        <img className="w-100 h-100"src={image} alt="404 Error"/>
    </div>
  )
}
