import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import MerchantDashboard from "./pages/MerchantDashboard";
import MerchantProducts from "./pages/MerchantProducts";
import MerchantLogin from "./pages/MerchantLogin";
import AuditTrail from "./pages/AuditTrail";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
  path="/product-details/:source/:id"
  element={<ProductDetails />}
/>
        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* My Orders */}
        <Route
          path="/orders"
          element={<MyOrders />}
        />
        <Route
  path="/merchant-login"
  element={<MerchantLogin />}
/>
        <Route
  path="/merchant"
  element={<MerchantDashboard />}
/>
<Route path="/merchant/products" element={<MerchantProducts />} />
        <Route path="/audit" element={<AuditTrail />} />
        <Route path="*" element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;