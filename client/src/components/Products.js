import React, { useContext, useEffect, useState } from 'react'
import Context from '../contextApi/Context.js';
import Item from './Item.js';
import Spinner from './Spinner.js';

export default function Products() {
  let context = useContext(Context);
  let [product, setProduct] = useState({});
  let [status, setStatus] = useState(false);
  let showAllProducts = async()=>{
    setStatus(false);
    let response = await context.fetchApi("", "GET", "api/products/showAllProduct","");
    setProduct(response.response);
    setStatus(true);
  }
  useEffect(()=>{
    let check = async()=>{
        await showAllProducts();
    }
    check();
    // eslint-disable-next-line
  },[]);
    return (
    <div className="container my-4">
      <h2 className="text-center text-white">
        Featured Products
      </h2>
      <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
      {status && 
      <div className="row">
        {
       product.response.map((e) => {
        return <Item key={e._id} value={e} cell={3}/>
       })
       }
      </div>}
      {
      !status && 
        <Spinner margin={"20px"}/>
      }
    </div>
  )
}
