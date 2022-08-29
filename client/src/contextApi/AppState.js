import { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Context from "./Context.js";
import axios from "axios";
let AppState = (props) =>{
  let navigate = useNavigate();
    // let host = "http://localhost:5000/"
    let host = "https://ecommerce-mern-8803.herokuapp.com/";
     let [user, setUser] = useState({success: false});
    let alert = useAlert();
   let [cart, setCart] = useState(localStorage.getItem('cartEcommerce') ? JSON.parse(localStorage.getItem('cartEcommerce')) : []);
   let [address, setAddress] = useState(localStorage.getItem('addressEcommerce') ? JSON.parse(localStorage.getItem('addressEcommerce')) : {});
    let [price, setPrice] = useState(localStorage.getItem("TotalEcommerce") ? JSON.parse(localStorage.getItem("TotalEcommerce")) : {});
  // Fetch Request 
let fetchApi = async (data, method, endpoint, type)=>{
  try{
    let response = "";
  if(method === "POST"){
   response = await axios.post(`${host}${endpoint}`, data, {headers : {
    'Content-Type': `${type}`,
    authtoken : localStorage.getItem("ecommerceauthtoken")
  }})
  }
  else if(method === "GET"){
   response = await axios.get(`${host}${endpoint}`, {headers : {
    'Content-Type': 'multipart/form-data',
    authtoken : localStorage.getItem("ecommerceauthtoken")
  }})
  }
  else if(method === "PUT"){
   response = await axios.put(`${host}${endpoint}`, data, {headers : {
    'Content-Type': `${type}`,
    authtoken : localStorage.getItem("ecommerceauthtoken")
  }})
  }
  else{
    response = await axios.delete(`${host}${endpoint}`,{headers : {
      'Content-Type': 'multipart/form-data',
      authtoken : localStorage.getItem("ecommerceauthtoken")
    }})
  }
  if(!response.data.success){
    alert.error(response.data.message);
    return false;
  }
  return response.data;
}
catch(e){
  alert.error("Something went wrong 404 error !");
  return false;
}
}
let fetchUser = async()=>{
 let response = await axios.get(`${host}api/users/showUser`, {headers : {
    'Content-Type': 'multipart/form-data',
    authtoken : localStorage.getItem("ecommerceauthtoken")
  }})
  if(response.data.success){
      setUser(response.data);
  }
} 
let logout = ()=>{
  localStorage.setItem("ecommerceauthtoken" , "");
  setUser({success: false});
  navigate("/");
  alert.success("Logout successfull");
}

 let addToCart = (response, quantity)=>{
  let contain = cart.find((i) => i._id === response._id);
  let temp = [];
  if(contain){
       cart.forEach((e)=>
        (e._id === response._id) ? temp.push({
          _id : response._id,
          name: response.name,
          desc: response.desc,
          price: response.price,
          stock: response.stock,
          images: response.images,
          quantity: quantity
        }): temp.push(e)
       )
      
  }
  else{
    cart.forEach((e)=> temp.push(e));
    temp.push({
      _id : response._id,
      name: response.name,
      desc: response.desc,
      price: response.price,
      stock: response.stock,
      images: response.images,
      quantity: quantity
    })
  }
  setCart(temp);
  localStorage.setItem("cartEcommerce", JSON.stringify(temp));
 }
 let removeFromCart = (detail)=>{
  let temp = cart.filter((e)=> (detail._id !== e._id));
  setCart(temp);
  localStorage.setItem("cartEcommerce", JSON.stringify(temp));
 }
 let saveAddress = (data)=>{
       localStorage.setItem("addressEcommerce", JSON.stringify(data));
       setAddress(data);
 }
 let setNull = ()=>{
  localStorage.setItem("cartEcommerce", "");
         localStorage.setItem("TotalEcommerce", "");
         setCart([]);
         setPrice({});
 }
return (
    <Context.Provider value={{fetchApi, fetchUser, user, logout, addToCart,cart, removeFromCart, address, saveAddress, price, setPrice, setNull}}>
        {props.children}
    </Context.Provider>
);
}
export default AppState;