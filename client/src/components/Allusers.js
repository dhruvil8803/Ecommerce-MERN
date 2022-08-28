import React, { useContext, useEffect, useState} from 'react'
import SideNavbar from "./SideNavbar";
import Context from "../contextApi/Context";
import AdminUser from './AdminUser';
import { useAlert } from 'react-alert';
import Error404 from "./Error404";
export default function Allusers() {
  let context = useContext(Context);
  let alert = useAlert();
  let [user, setUser] = useState(false);
  let showAllUser = async()=>{
      let response = await context.fetchApi("", "GET", "api/users/admin/showAllUser");
      if(!response) return;
       setUser(response.response);
  }
  
  useEffect(()=>{
    showAllUser(); 
    // eslint-disable-next-line
  }, []);

  let deleteUser = async(id)=>{
      let response = await context.fetchApi("", "DELETE", `api/users/admin/deleteUser/${id}`, "application/json")
      if(response){
        alert.success("User Deletion Successfull");
        showAllUser();
      }
  }
  let changeRole = async(id, role) => {
    role = (role === "admin") ? "user" : "admin";
    let response = await context.fetchApi({role: role}, "PUT", `api/users/admin/updateRole/${id}`, "application/json")
    if(response) {
      alert.success("Role Updated Successfully");
      await context.fetchUser();
      showAllUser();
    }
  }
  return (
    <div style={{marginTop: "63px"}}>
      {context.user.success && context.user.response.role === "admin"  &&  user &&
       <div className="d-flex w-100">
          <SideNavbar active={3}/>
          <div className="p-3 d-flex justify-content-center align-items-center" style={{width: "80vw", height: "120vh", borderLeft: "2px solid white"}} >
           <div className="overflow-auto rounded" style={{height: "90%", width: "95%", backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
           <div className='d-flex w-100 align-items-center rounded-top' style={{height: "10vh", backgroundColor: "#3dbbd2"}}>
            <h4 className="text-center" style={{width: "10%"}}>Avatar</h4>
            <h4 className="text-center" style={{width: "35%"}}>Email_Id</h4>
            <h4 className="text-center" style={{width: "20%"}}>Name</h4>
            <h4 className="text-center" style={{width: "15%"}}>Role</h4>
            <h4 className="text-center" style={{width: "10%"}}>Update</h4>
            <h4 className="text-center" style={{width: "10%"}}>Delete</h4>
          </div>
          {
          user.map((e)=>{
            return <AdminUser key={e._id} user={e} deleteUser={deleteUser} changeRole={changeRole}/>
          })
          }
           </div>
       </div>
       </div>
       }
       {!context.user.success || context.user.response.role !== "admin" ? <Error404 margin={"0px"}/> : ""}
    </div>
  )
}
