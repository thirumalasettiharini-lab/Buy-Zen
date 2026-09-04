import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <section className="order-success">
        <h1>Order Not Found</h1>

        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="order-success">
      <h1>🎉 Order Confirmed!</h1>

      <p>Thank you for shopping with us.</p>

      <div className="success-card">
        <h2>Order ID: {order.id}</h2>

        <p>
          <strong>Payment:</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.paymentStatus}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>

        <p>
          <strong>Date:</strong> {order.date}
        </p>
      </div>

      <div className="success-buttons">
        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>

        <button onClick={() => navigate("/orders")}>
          View My Orders
        </button>
      </div>
    </section>
  );
}

export default OrderSuccess;