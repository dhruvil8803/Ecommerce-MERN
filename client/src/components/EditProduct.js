import React, { useEffect, useState, useContext } from 'react'
import Context from '../contextApi/Context';
import { useParams,useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useAlert } from 'react-alert';
import Error404 from "./Error404";
export default function EditProduct() {
    let alert = useAlert();
    let navigate = useNavigate();
    let context = useContext(Context);
    let [data, setData] = useState(false);
    let [status, setStatus] = useState(false);
    let [image, setImage] = useState([])
    let [pimage, setPimage] = useState([])
    let { id } = useParams();
    let showProduct = async()=>{
        let response = await context.fetchApi("", "POST", `api/products/showProduct/${id}`, "multipart/form-data");
        if(!response) return;
         setData(response.response);
         setPimage(response.response.images);
    }
    useEffect(()=>{
        showProduct();
      // eslint-disable-next-line 
    }, []);
    let changeForm = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
   }
   let changeImage = (e)=>{
    let files = Array.from(e.target.files);
    if(files.length !== 0) {
      setImage([]);
      setPimage([]);
    } 
    files.forEach((f)=>{
        let reader = new FileReader();
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setImage((old)=>[...old, reader.result])
                setPimage((old)=>[...old, {url: reader.result}])
            }
        }
        reader.readAsDataURL(f);
    })
}

let handleClick = async (e)=>{
  e.preventDefault();
  setStatus(true);
 if(data.name.trim().length < 4) {
     alert.error("Name must atleast contain 4 characters");
     setStatus(false);
     return;
 }
 if(data.desc.trim().length < 15) {
     alert.error("Descreption must atleast contain 15 characters");
     setStatus(false);
     return;
 }
 if(data.price <= 0 || data.stock < 0) {
     alert.error("Please enter valid price or stock");
     setStatus(false);
     return;
 }
 if(data.price > 1000000){
     alert.error("Price of product can atmost be 1M");
     setStatus(false);
     return;
 }
 if(data.stock > 1000){
  alert.error("Stock of product can atmost be 1K");
  setStatus(false);
  return;
 }
 const formData = new FormData(); 
 formData.append("name", data.name);
 formData.append("desc", data.desc);
 formData.append("price", data.price);
 formData.append("stock", data.stock);
 formData.append("category", data.category);
 if(image.length !== 0) {
   for (const x of image) {
    formData.append("images", x);
  }
 }

 let response = await context.fetchApi(formData, "PUT", `api/products/admin/updateProduct/${data._id}`, "multipart/form-data");
 if(response){
     alert.success("Product Updated successfully");
     navigate("/admin/allproducts");
     return;
 }
 setStatus(false);
}

  return (
      <div style={{marginTop: "63px"}}>

     {context.user.success && context.user.response.role === "admin" && data && <div className="p-3 d-flex justify-content-center align-items-center" style={{width: "100%", height: "120vh"}} >
         <div className="rounded overflow-auto p-3 text-white" style={{height: "90%", width: "95%", backgroundColor: "rgba(30, 32, 44, 0.95)"}}>
         <h3 className="text-center fw-bold">Update Product</h3>
      <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
    <form>
    <div className="mb-3">
  <label htmlFor="name" className="form-label">Name:</label>
  <input defaultValue={data.name} onChange={changeForm} type="text" className="form-control bg-dark text-white p-2" id="name" name="name" required/>
</div>
<div className="mb-3">
  <label htmlFor="desc" className="form-label">Descreption:</label>
  <textarea defaultValue={data.desc} onChange={changeForm} type="desc" className="form-control bg-dark text-white p-2" id="desc" name="desc" required/>
</div>
<div className="mb-3 d-flex w-100">
<div style={{marginRight: "3.5%"}}>
  <label htmlFor="price" className="form-label">Price:</label>
  <input defaultValue={data.price} onChange={changeForm} type="number" className="form-control bg-dark text-white p-2" id="price" name="price" required/>
</div>
<div style={{marginRight: "3.5%"}}>
  <label htmlFor="stock" className="form-label">Stock:</label>
  <input defaultValue={data.stock} onChange={changeForm} type="number" className="form-control bg-dark text-white p-2" id="stock" name="stock" required/>
</div>
<div style={{marginRight: "3.5%", width: "20%"}}>
  <label htmlFor="category" className="form-label">Category:</label>
  <select className="form-select text-white w-100 bg-dark" defaultValue={data.category} onChange={changeForm} name="category">
          <option value="Mobile">Mobiles</option>
          <option value="Laptop">Laptops</option>
          <option value="Game">Games</option>
          <option value="Toy">Toys</option>
          <option value="Fashion">Fashions</option>
          <option value="Shoe">Shoes</option>
          <option value="Electronic">Electronics</option>
          <option value="Other">Other</option>
        </select>
  </div>
</div>
<div className="mb-3">
  <label htmlFor="Image" className="form-label d-block">Choose Images:</label>
   <input type="file" onChange={changeImage} className="w-25 text-white" id="avtar" name="avatar" required multiple/>
</div>
<label htmlFor="Image" className="form-label d-block">Preview:</label>
<div className="bg-dark w-100 text-white rounded d-flex p-3 flex-wrap justify-content-between">
    {pimage.length !== 0 && pimage.map((e, item)=>{
        return <img key={item} src={e.url} alt="ProductImage" className="my-2 rounded"style={{width: "48%" , height: "42vh"}}/>
    }) }
    {pimage.length === 0 && <h1 className="text-white text-center">No images to preview</h1>}
</div>
 {status && <Spinner margin={"0px"}/>}
<div className='d-flex justify-content-center m-3'><button disabled={status} type="submit" onClick={handleClick} className="px-3 btn btn-primary text-black mx-1" style={{backgroundColor: "#9eeaf9"}}>Update Product</button></div>
 </form>
         </div>
     </div>
     }
       {!context.user.success || context.user.response.role !== "admin" ? <Error404 margin={"0px"}/>: ""}
 </div>
  )
}
