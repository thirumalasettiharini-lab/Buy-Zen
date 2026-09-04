import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders([...savedOrders].reverse());
  }, []);

  const getStatusStep = (status) => {
    const steps = [
      "Order Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    return steps.indexOf(status);
  };

  if (orders.length === 0) {
    return (
      <section className="orders-page empty-orders">
        <h1>My Orders 📦</h1>

        <p>You haven't placed any orders yet.</p>

        <button onClick={() => navigate("/products")}>
          Start Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="orders-page">

      <h1>My Orders 📦</h1>

      <div className="orders-list">

        {orders.map((order) => {

          const currentStep = getStatusStep(
            order.orderStatus || "Order Confirmed"
          );

          return (
            <div
              className="order-card"
              key={order.id}
            >

              {/* ORDER HEADER */}

              <div className="order-header">

                <div>
                  <h2>{order.id}</h2>
                  <p>{order.date}</p>
                </div>

                <span className="order-status">
                  {order.orderStatus ||
                    "Order Confirmed"}
                </span>

              </div>


              {/* TRACKING */}

              <div className="tracking-section">

                <h3>
                  Track Your Order 🚚
                </h3>

                <div className="tracking">

                  <div
                    className={
                      currentStep >= 0
                        ? "tracking-step completed"
                        : "tracking-step"
                    }
                  >
                    <div className="tracking-circle">
                      ✓
                    </div>

                    <p>Order Confirmed</p>
                  </div>


                  <div
                    className={
                      currentStep >= 1
                        ? "tracking-step completed"
                        : "tracking-step"
                    }
                  >
                    <div className="tracking-circle">
                      ✓
                    </div>

                    <p>Processing</p>
                  </div>


                  <div
                    className={
                      currentStep >= 2
                        ? "tracking-step completed"
                        : "tracking-step"
                    }
                  >
                    <div className="tracking-circle">
                      ✓
                    </div>

                    <p>Shipped</p>
                  </div>


                  <div
                    className={
                      currentStep >= 3
                        ? "tracking-step completed"
                        : "tracking-step"
                    }
                  >
                    <div className="tracking-circle">
                      ✓
                    </div>

                    <p>Out for Delivery</p>
                  </div>


                  <div
                    className={
                      currentStep >= 4
                        ? "tracking-step completed"
                        : "tracking-step"
                    }
                  >
                    <div className="tracking-circle">
                      ✓
                    </div>

                    <p>Delivered</p>
                  </div>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="order-products">

                {order.items.map((item) => (

                  <div
                    className="order-product"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>{item.name}</h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              {/* FOOTER */}

              <div className="order-footer">

                <div>
                  <span>Payment</span>

                  <strong>
                    {order.paymentMethod}
                  </strong>
                </div>

                <div>
                  <span>Total</span>

                  <strong>
                    ₹{order.total}
                  </strong>
                </div>

              </div>

            </div>
          );
        })}

      </div>


      <button
        className="continue-shopping"
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </button>

    </section>
  );
}

export default MyOrders;