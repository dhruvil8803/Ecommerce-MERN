import React, { useContext, useEffect,  useState} from 'react'
import SideNavbar from "./SideNavbar";
import Context from "../contextApi/Context";
import AdminProduct from "./AdminProduct";
import { useAlert } from "react-alert";
import Error404 from "./Error404";
export default function Allproducts() {
      let alert = useAlert();
      let context = useContext(Context);
      let [product, setProduct] = useState(false);
     
      let showAllProduct = async()=>{
          let response = await context.fetchApi("", "GET", "api/products/admin/showAllProduct");
          if(!response) return;
           setProduct(response.response);
      }
      useEffect(()=>{
        showAllProduct(); 
        // eslint-disable-next-line
      }, []);
      let deleteProduct = async(id)=>{
        let response = await context.fetchApi("", "DELETE", `api/products/admin/deleteProduct/${id}`, "application/json")
        if(response){
          alert.success("Product Deleted Successfully");
           showAllProduct();
        }
      }
  return (
    <div style={{marginTop: "63px"}}>
      {context.user.success && context.user.response.role === "admin"  &&  product &&
       <div className="d-flex w-100">
          <SideNavbar active={21}/>
          <div className="p-3 d-flex justify-content-center align-items-center" style={{width: "80vw", height: "120vh", borderLeft: "2px solid white"}} >
           <div className="rounded overflow-auto" style={{height: "90%", width: "95%", backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
           <div className='w-100 d-flex align-items-center rounded-top' style={{height: "10vh", backgroundColor: "#3dbbd2"}}>
            <h4 className="text-center" style={{width: "55%"}}>Product</h4>
            <h4 className="text-center" style={{width: "15%"}}>Price</h4>
            <h4 className="text-center" style={{width: "10%"}}>Stock</h4>
            <h4 className="text-center" style={{width: "20%"}}>Actions</h4>
          </div>
          {
           product.map((e)=>{
             return <AdminProduct key={e._id} item={e} deleteProduct={deleteProduct}/>
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
