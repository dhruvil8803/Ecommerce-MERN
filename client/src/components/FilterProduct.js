import React, { useContext, useEffect, useState } from 'react'
import Context from '../contextApi/Context.js';
import Item from './Item.js';
import Spinner from './Spinner.js';
import Slider from '@mui/material/Slider';
export default function FilterProduct() {
  let context = useContext(Context);
  let [page, setPage] = useState(1);
  let [category, setCategory] = useState("");
  let [keyword, setKeyword] = useState("");
  let [rating, setRating] = useState(0);
  let [price, setPrice] = useState([0, 200000]);
  let [product, setProduct] = useState({});
  let [status, setStatus] = useState(false);
  let showAllProducts = async(page)=>{
    setStatus(false);
    let response = await context.fetchApi("","GET", `api/products/showAllProduct?page=${page}&category=${category}&price[lte]=${price[1]}&price[gte]=${price[0]}&keyword=${keyword}&rating[gte]=${rating}`);
    setProduct(response.response);
    setStatus(true);
  }
  useEffect(()=>{
    let check = async()=>{
        await showAllProducts(1);
    }
    check();
    // eslint-disable-next-line
  },[]);
  let changePage = (val)=>{
    showAllProducts(page + val);
    setPage(page + val);
  }
  let changeCategory = (event)=>{
    setCategory(event.target.value);
  }
  let changeKeyword = (event)=>{
    setKeyword(event.target.value);
  }
  let changePrice = (event)=>{
    setPrice(event.target.value);
  }
  let changeRating = (event)=>{
    setRating(event.target.value);
  }
  let filterResult = ()=>{
    showAllProducts(1);
    setPage(1);
  }
  return (
  <div className="d-flex w-100" style={{marginTop: "63px", height : "90vh"}}>
      <div className="d-flex h-100 justify-content-center align-items-center" style={{width: "20%"}}>
        <form action="" className="text-white d-flex flex-column" style={{width: "90%", borderRight: "2px solid white"}}>
          <h3 className="text-center">Filter By</h3>
          <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
          <div className='my-1'>
          <label  className="form-label">Category:</label>
        <select className="form-select text-white w-75" defaultValue={category} onChange={changeCategory} style={{backgroundColor:"rgba(30, 32, 44, 0.95)"}}>
          <option value="">All</option>
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
          <div className="my-1">
          <label  className="form-label">Search Keyword:</label>
           <input type="text" className="form-control w-75 text-white" defaultValue={keyword}  onChange={changeKeyword} style={{backgroundColor:"rgba(30, 32, 44, 0.95)", outline: "none"}} />
          </div>
          <div className="my-1">
          <label  className="form-label">Range: </label>
          <Slider value={price} onChange={changePrice} valueLabelDisplay="auto" min={0} max={200000} sx={{width: "75%", display: "block"}}/>
          </div>
          <div className="my-1">
          <label  className="form-label">Least Rating: </label>
          <Slider value={rating} onChange={changeRating} valueLabelDisplay="auto" min={0} max={5} sx={{width: "75%", display: "block"}}/>
          </div>
          <button type="button" className="btn btn-primary text-black my-3 w-50" onClick={filterResult}style={{backgroundColor: "#9eeaf9"}}>Search</button>
        </form>
      </div>
      <div className="d-flex flex-column h-100" style={{width: "80%", overflow:"auto"}}>  
      <div className="container my-4">
      <h2 className="text-center text-white">
        Products
      </h2>
      <hr className="w-25 mx-auto" style={{borderTop: "2px solid white"}}/>
      {status && 
      <div className="row">
        {
       product.response.map((e) => {
        return <Item key={e._id} value={e} cell={3}/>
       })
       }
       <div className="d-flex justify-content-between my-3">
       <button type="button" onClick={()=>changePage(-1)} disabled={(page===1) ? true : false} className="btn btn-primary text-black" style={{backgroundColor: "#9eeaf9"}}><i className="fa-solid fa-arrow-left"></i> Previous</button>
       <button type="button" onClick={()=>changePage(1)} disabled={(page===Math.ceil(product.result/8)) ? true : false} className="btn btn-primary text-black" style={{backgroundColor: "#9eeaf9"}}>Next <i className="fa-solid fa-arrow-right"></i></button>
       </div>
      </div>}
      {
      !status && 
        <Spinner />
      }
    </div>
      </div>
  </div>
  )
}
