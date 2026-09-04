import { Link } from "react-router-dom";
function Navbar(){return <nav className="navbar"><div className="logo">BuyZen</div><div className="nav-links"><Link to="/">Home</Link><Link to="/products">Products</Link><Link to="/orders">My Orders</Link><Link to="/cart">🛒 Cart</Link><Link to="/merchant-login">
  Merchant Login
</Link></div></nav>}
export default Navbar;
