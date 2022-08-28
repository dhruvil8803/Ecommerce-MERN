import React from 'react'
import { useContext } from 'react'
import Context from '../contextApi/Context'
import {Link} from "react-router-dom"
import Error404 from "./Error404";
export default function Profile() {
  let context = useContext(Context)
  return (
    <div>
      {context.user.success && 
      <div className="w-75 p-4" style={{margin: "20vh auto" ,backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
        <div>
         <h3 className="text-center fw-bold text-white">Profile</h3>
        <hr className="w-50 mx-auto mb-3" style={{borderTop: "2px solid white"}}/>
        </div>
      <div className="d-flex rounded" style={{height: "90vh" ,width: "100%", margin: "0 auto"}}>
         <div className="w-50 h-100 d-flex  flex-column justify-content-evenly align-items-center">
          <img src={context.user.response.avatar.url} alt="profile" className="w-50 h-50 rounded-circle"/>
          <Link to="/updateImage" type="button" className="btn btn-primary text-black mx-2" style={{ backgroundColor: "#3dbbd2" }}><i class="fa-solid fa-user-astronaut"></i> Change Profile Image</Link>
         </div>
         <div className="w-50 h-100 d-flex flex-column p-3 text-white justify-content-evenly">
          <div>
          <h3>Name:</h3>
          <p style={{
            backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "250%",
            fontWeight: "bold"
          }}>{context.user.response.name}</p>
          </div>
          <div>

          <h3>Email:</h3>
          <p style={{
            backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "250%",
            fontWeight: "bold"
          }}>{context.user.response.email}</p>
          </div>
          <div>

          <h3>Last Updated On:</h3>
          <p style={{
            backgroundImage: "linear-gradient(rgba(42, 245, 152, 1) ,rgba(0, 158, 253, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "250%",
            fontWeight: "bold"
          }}>{new Date(context.user.response.date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
          </div>

             <div className="d-flex justify-content-start my-2">
                  <Link to="/updatePassword" type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}><i class="fa-solid fa-key"></i> Reset Password</Link>
                  <Link to="/updateProfileInfo" type="button" className="btn btn-primary text-black mx-2" style={{ backgroundColor: "#3dbbd2" }}><i class="fa-solid fa-address-card"></i> Update Profile</Link>
                </div>
         </div>
      </div>
      </div>
      }
      {!context.user.success && 
    <Error404 margin={"63px"}/>  }
    </div>
  )
}
