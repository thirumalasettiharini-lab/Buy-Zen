import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productKey, addAuditEvent } from "../utils/commerce";
function Cart(){
 const [cart,setCart]=useState([]); useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("cart"))||[])}catch{setCart([])}},[]);
 const save=(next)=>{setCart(next);localStorage.setItem("cart",JSON.stringify(next));};
 const updateCart=(key,change)=>{const next=cart.map(i=>productKey(i)===key?{...i,quantity:Math.max(1,Number(i.quantity||1)+change)}:i);save(next);addAuditEvent({action:"CART_QUANTITY_CHANGED",details:{key,change},money_action:false});};
 const removeItem=(key)=>{save(cart.filter(i=>productKey(i)!==key));addAuditEvent({action:"REMOVE_FROM_CART",details:{key},money_action:false});};
 const total=cart.reduce((s,i)=>s+Number(i.price||0)*Number(i.quantity||1),0);
 if(!cart.length)return <section className="cart-page"><h1>Your Cart 🛒</h1><p>Your cart is empty.</p><Link to="/products"><button>Continue Shopping</button></Link></section>;
 return <section className="cart-page"><h1>Your Cart 🛒</h1><div className="cart-items">{cart.map(item=>{const key=productKey(item);return <div className="cart-item" key={key}>{item.image&&<img src={item.image} alt={item.name}/>}<div><h3>{item.name}</h3><p>₹{Number(item.price).toLocaleString("en-IN")}</p><div className="cart-controls"><button onClick={()=>updateCart(key,-1)}>-</button><span>{item.quantity}</span><button onClick={()=>updateCart(key,1)}>+</button><button onClick={()=>removeItem(key)}>Remove</button></div></div></div>})}</div><div className="cart-summary"><h2>Total: ₹{total.toLocaleString("en-IN")}</h2><Link to="/checkout"><button>Proceed to Checkout</button></Link></div></section>;
}
export default Cart;
