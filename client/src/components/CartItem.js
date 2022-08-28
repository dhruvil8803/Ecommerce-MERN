import React, { useContext } from 'react'
import Context from '../contextApi/Context';
export default function CartItem(props) {
    let context = useContext(Context);
    let {item} = props;
    let increaseQuantity = ()=>{
        if(item.quantity === item.stock) return;
        context.addToCart(item, item.quantity + 1);
     }
     let decreaseQuantity = ()=>{
       if(item.quantity === 1) return;
       context.addToCart(item, item.quantity - 1);
    }
    let remove = ()=>{
        context.removeFromCart(item);
    }
  return (
    <div className='d-flex w-100 text-white' style={{backgroundColor: "rgba(30, 32, 44, 0.95)", height: "22vh", borderBottom: "1px solid white"}}>
        <div className="h-100 d-flex align-items-center justify-content-evenly" style={{width: "66%"}}>
            <div style={{height: "90%", width: "22%"}}><img className="h-100 w-100" src={item.images[0].url} alt="product" /></div>
            <div style={{height: "80%", width: "55%"}}>
                <h4>{(item.name.length > 25) ? `${(item.name).slice(0, 25)}...`: item.name}</h4>
                <p className='text-break'>{(item.desc.length > 75) ? `${(item.desc).slice(0, 75)}...`: item.desc}</p>
                 
            </div>
            <div style={{width: "15%"}}>
            <button type="button" onClick={remove} className="btn btn-primary text-black" style={{ backgroundColor: "#3dbbd2" }}>Remove</button>
            </div>
                
        </div>
        <div className="h-100 d-flex align-items-center justify-content-center" style={{width: "17%"}}>
            <button onClick={decreaseQuantity} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}>-</button>
                  <div className="bg-white text-black mx-3 p-2 text-center" style={{ width: "40px" }}>{item.quantity}</div>
                  <button onClick={increaseQuantity} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#9eeaf9" }}>+</button>
                </div>
        <h4 className="h-100 d-flex align-items-center justify-content-center" style={{width: "17%"}}>{item.price * item.quantity}
                      <i className="fa-solid fa-indian-rupee-sign fa-fade"></i></h4>
      
    </div>
  )
}
