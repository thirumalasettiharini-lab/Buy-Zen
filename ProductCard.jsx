import { Link } from "react-router-dom";
import { addProductToCart, addAuditEvent } from "../utils/commerce";

function ProductCard({ product }) {
  const addToCart = async () => {
    addProductToCart(product);
    await addAuditEvent({ action: "ADD_TO_CART", product_id: String(product.id), details: { source: product.source || "catalog", price: Number(product.price) }, money_action: false });
    alert(`${product.name} added to cart 🛒`);
  };
  return <div className="product-card">
    {product.image ? <img src={product.image} alt={product.name} onError={(e)=>{e.currentTarget.style.display="none";}} /> : <div className="product-placeholder">BuyZen</div>}
    <div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><h4>₹{Number(product.price).toLocaleString("en-IN")}</h4>
      <div className="product-actions"><Link to={`/product-details/${product.source || "catalog"}/${product.id}`}><button>View Details</button></Link><button onClick={addToCart}>Add to Cart 🛒</button></div>
    </div></div>;
}
export default ProductCard;
