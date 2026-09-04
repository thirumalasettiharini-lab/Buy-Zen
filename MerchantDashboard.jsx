import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MerchantDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  useEffect(() => {
    loadCatalog();
    loadOrders();
    loadDemands();
  }, []);

  // ==========================================
  // LOAD BUYZEN CATALOG
  // ==========================================

  const loadCatalog = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/catalog"
      );

      if (!response.ok) {
        throw new Error("Failed to load BuyZen catalog");
      }

      const data = await response.json();

      const catalogProducts = (data.products || []).map(
        (product) => ({
          id: product.product_id || product.id,

          product_id: product.product_id,

          merchant_id: product.merchant_id,

          name: product.name,

          category: product.category,

          price: Number(product.price || 0),

          currency: product.currency || "INR",

          stock: Number(product.stock || 0),

          availability:
            product.availability || "in_stock",

          description:
            product.description || "",

          image: product.image || "",

          attributes:
            product.attributes || {},

          tags:
            product.tags || [],

          agent_actions:
            product.agent_actions || [],

          source: "catalog",
        })
      );

      setProducts(catalogProducts);
    } catch (error) {
      console.error(
        "BuyZen catalog loading error:",
        error
      );

      setProducts([]);
    }

    setLoading(false);
  };

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = () => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);
  };

  // ==========================================
  // LOAD CUSTOMER DEMANDS
  // ==========================================

  const loadDemands = () => {
    const savedDemands =
      JSON.parse(
        localStorage.getItem("customerDemands")
      ) || [];

    setDemands(savedDemands);
  };

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-IN"
    );
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const totalValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        Number(product.stock || 0),
    0
  );

  const categories = new Set(
    products.map(
      (product) => product.category
    )
  ).size;

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  // ==========================================
  // SCROLL FUNCTIONS
  // ==========================================

  const goToOrders = () => {
    document
      .getElementById("orders-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goToTransactions = () => {
    document
      .getElementById(
        "transactions-section"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goToDemand = () => {
    document
      .getElementById("demand-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="merchant-loading">
        <h2>
          Loading Merchant Dashboard...
        </h2>

        <p>
          Loading BuyZen catalog and store data...
        </p>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="merchant-layout">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="merchant-sidebar">

        <div className="merchant-logo">
          <span>◈</span>
          <h2>BuyZen</h2>
        </div>

        <p className="merchant-role">
          MERCHANT PORTAL
        </p>

        <nav className="merchant-nav">

          <button className="active">
            <span>▦</span>
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/merchant/products")
            }
          >
            <span>▣</span>
            Products
          </button>

          <button onClick={goToOrders}>
            <span>▤</span>
            Orders
          </button>

          <button onClick={goToTransactions}>
            <span>◉</span>
            Transactions
          </button>

          <button onClick={goToDemand}>
            <span>🔥</span>
            Customer Demand
          </button>

        </nav>

        <div className="merchant-sidebar-bottom">

          <button
            className="back-store"
            onClick={() => navigate("/")}
          >
            ← Back to Store
          </button>

        </div>

      </aside>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="merchant-main">

        {/* ====================================
            HEADER
        ==================================== */}

        <header className="merchant-topbar">

          <div>

            <p className="dashboard-label">
              MERCHANT DASHBOARD
            </p>

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Manage your BuyZen store from one
              place.
            </p>

          </div>

          <div className="merchant-account">

            <div className="merchant-avatar">
              M
            </div>

            <div>
              <strong>
                Merchant
              </strong>

              <span>
                Store Owner
              </span>
            </div>

          </div>

        </header>

        {/* ====================================
            STATISTICS
        ==================================== */}

        <section className="merchant-stat-grid">

          <div className="merchant-stat">

            <div className="stat-icon">
              ◈
            </div>

            <div>
              <span>
                Total Products
              </span>

              <strong>
                {products.length}
              </strong>
            </div>

          </div>

          <div className="merchant-stat">

            <div className="stat-icon">
              📦
            </div>

            <div>
              <span>
                Total Stock
              </span>

              <strong>
                {totalStock}
              </strong>
            </div>

          </div>

          <div className="merchant-stat">

            <div className="stat-icon">
              ◉
            </div>

            <div>
              <span>
                Categories
              </span>

              <strong>
                {categories}
              </strong>
            </div>

          </div>

          <div className="merchant-stat">

            <div className="stat-icon">
              🛒
            </div>

            <div>
              <span>
                Total Orders
              </span>

              <strong>
                {totalOrders}
              </strong>
            </div>

          </div>

        </section>

        {/* ====================================
            SALES STATISTICS
        ==================================== */}

        <section className="merchant-stat-grid">

          <div className="merchant-stat">

            <div className="stat-icon">
              ₹
            </div>

            <div>
              <span>
                Inventory Value
              </span>

              <strong>
                ₹{formatPrice(totalValue)}
              </strong>
            </div>

          </div>

          <div className="merchant-stat">

            <div className="stat-icon">
              💰
            </div>

            <div>
              <span>
                Total Sales
              </span>

              <strong>
                ₹{formatPrice(totalSales)}
              </strong>
            </div>

          </div>

        </section>

        {/* ====================================
            QUICK ACTIONS + STORE SUMMARY
        ==================================== */}

        <section className="merchant-content-grid">

          {/* QUICK ACTIONS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Manage your store efficiently.
                </p>

              </div>

            </div>

            <div className="quick-actions">

              <button
                onClick={() =>
                  navigate(
                    "/merchant/products"
                  )
                }
              >

                <span>
                  ＋
                </span>

                <div>

                  <strong>
                    Add Product
                  </strong>

                  <small>
                    Add a new product to your
                    catalog
                  </small>

                </div>

              </button>

              <button
                onClick={() =>
                  navigate(
                    "/merchant/products"
                  )
                }
              >

                <span>
                  ▣
                </span>

                <div>

                  <strong>
                    Manage Products
                  </strong>

                  <small>
                    View and manage your catalog
                  </small>

                </div>

              </button>

              <button
                onClick={goToOrders}
              >

                <span>
                  ▤
                </span>

                <div>

                  <strong>
                    View Orders
                  </strong>

                  <small>
                    See customer orders
                  </small>

                </div>

              </button>

              <button
                onClick={goToDemand}
              >

                <span>
                  🔥
                </span>

                <div>

                  <strong>
                    Customer Demand
                  </strong>

                  <small>
                    See what customers are asking
                    for
                  </small>

                </div>

              </button>

            </div>

          </div>

          {/* STORE SUMMARY */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Store Summary
                </h2>

                <p>
                  Your current BuyZen catalog.
                </p>

              </div>

            </div>

            <div className="store-summary">

              <div>

                <span>
                  Products
                </span>

                <strong>
                  {products.length}
                </strong>

              </div>

              <div>

                <span>
                  Stock Units
                </span>

                <strong>
                  {totalStock}
                </strong>

              </div>

              <div>

                <span>
                  Orders
                </span>

                <strong>
                  {orders.length}
                </strong>

              </div>

              <div>

                <span>
                  Sales
                </span>

                <strong>
                  ₹{formatPrice(totalSales)}
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================
            CUSTOMER ORDERS
        ==================================== */}

        <section
          className="dashboard-panel"
          id="orders-section"
        >

          <div className="panel-header">

            <div>

              <h2>
                Customer Orders
              </h2>

              <p>
                Orders placed by customers.
              </p>

            </div>

            <span className="coming-soon">
              {orders.length} ORDERS
            </span>

          </div>

          {orders.length === 0 ? (

            <div className="transaction-empty">

              <div className="transaction-icon">
                🛒
              </div>

              <h3>
                No orders yet
              </h3>

              <p>
                Customer orders will appear here
                after someone purchases a product.
              </p>

            </div>

          ) : (

            <div className="merchant-orders">

              {orders
                .slice()
                .reverse()
                .map((order) => (

                  <div
                    className="merchant-order"
                    key={order.id}
                  >

                    {/* ORDER HEADER */}

                    <div className="merchant-order-header">

                      <div>

                        <strong>
                          {order.id}
                        </strong>

                        <span>
                          {order.date}
                        </span>

                      </div>

                      <span className="order-status">
                        {order.orderStatus ||
                          "Order Confirmed"}
                      </span>

                    </div>

                    {/* CUSTOMER */}

                    <div className="order-customer">

                      <strong>
                        Customer
                      </strong>

                      <span>
                        {order.customer?.name ||
                          "Unknown"}
                      </span>

                      <span>
                        {order.customer?.email ||
                          "No email"}
                      </span>

                      <span>
                        {order.customer?.phone ||
                          "No phone"}
                      </span>

                      {order.customer?.city && (
                        <span>
                          {order.customer.city}
                        </span>
                      )}

                    </div>

                    {/* ORDER ITEMS */}

                    <div className="order-items">

                      {order.items?.map(
                        (item, index) => (

                          <div
                            className="merchant-order-item"
                            key={`${item.id}-${index}`}
                          >

                            {item.image ? (

                              <img
                                src={item.image}
                                alt={item.name}
                              />

                            ) : (

                              <div className="order-item-placeholder">
                                📦
                              </div>

                            )}

                            <div>

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                Quantity:{" "}
                                {item.quantity}
                              </span>

                            </div>

                            <strong>
                              ₹
                              {formatPrice(
                                Number(item.price) *
                                  Number(
                                    item.quantity
                                  )
                              )}
                            </strong>

                          </div>

                        )
                      )}

                    </div>

                    {/* ORDER FOOTER */}

                    <div className="merchant-order-footer">

                      <div>

                        <span>
                          Payment
                        </span>

                        <strong>
                          {order.paymentMethod ||
                            "UPI"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Payment Status
                        </span>

                        <strong className="paid">
                          {order.paymentStatus ||
                            "Paid"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Total
                        </span>

                        <strong>
                          ₹
                          {formatPrice(
                            order.total
                          )}
                        </strong>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

        {/* ====================================
            CUSTOMER DEMAND
        ==================================== */}

        <section
          className="dashboard-panel demand-panel"
          id="demand-section"
        >

          <div className="panel-header">

            <div>

              <h2>
                🔥 Customer Demand
              </h2>

              <p>
                Products customers are asking for.
              </p>

            </div>

            <span className="coming-soon">
              AI INSIGHTS
            </span>

          </div>

          {demands.length === 0 ? (

            <div className="transaction-empty">

              <div className="transaction-icon">
                🔍
              </div>

              <h3>
                No customer requests yet
              </h3>

              <p>
                When customers ask the AI for
                products that aren't in your
                catalog, their requirements will
                appear here.
              </p>

            </div>

          ) : (

            <div className="customer-demand-list">

              {[...demands]
                .sort(
                  (a, b) =>
                    Number(b.requests || 0) -
                    Number(a.requests || 0)
                )
                .map((demand) => (

                  <div
                    className="customer-demand-card"
                    key={demand.id}
                  >

                    <div className="demand-icon">
                      💻
                    </div>

                    <div className="demand-info">

                      <span className="demand-category">
                        {demand.category ||
                          "Product"}
                      </span>

                      <h3>
                        {demand.request}
                      </h3>

                      <div className="demand-details">

                        {demand.brand &&
                          demand.brand !== "Any" && (
                            <span>
                              🏷️ {demand.brand}
                            </span>
                          )}

                        {demand.purpose &&
                          demand.purpose !==
                            "General" && (
                            <span>
                              🎯 {demand.purpose}
                            </span>
                          )}

                        {demand.budget && (
                          <span>
                            💰 ₹{demand.budget}
                          </span>
                        )}

                        {demand.ram && (
                          <span>
                            💾 {demand.ram} RAM
                          </span>
                        )}

                        {demand.processor && (
                          <span>
                            ⚙️ {demand.processor}
                          </span>
                        )}

                      </div>

                      <small>
                        Last requested:{" "}
                        {demand.lastRequest ||
                          "Recently"}
                      </small>

                    </div>

                    <div className="demand-count">

                      <strong>
                        {demand.requests || 1}
                      </strong>

                      <span>
                        {Number(
                          demand.requests || 1
                        ) === 1
                          ? "request"
                          : "requests"}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

        {/* ====================================
            TRANSACTIONS
        ==================================== */}

        <section
          className="dashboard-panel transactions-panel"
          id="transactions-section"
        >

          <div className="panel-header">

            <div>

              <h2>
                Transactions
              </h2>

              <p>
                Payment activity from customer
                orders.
              </p>

            </div>

            <span className="coming-soon">
              PAYMENT API
            </span>

          </div>

          {orders.length === 0 ? (

            <div className="transaction-empty">

              <div className="transaction-icon">
                ◉
              </div>

              <h3>
                No transactions yet
              </h3>

              <p>
                Transactions will appear here
                when customers place orders.
              </p>

            </div>

          ) : (

            <div className="transaction-table">

              <div className="transaction-head">

                <span>
                  Transaction
                </span>

                <span>
                  Customer
                </span>

                <span>
                  Amount
                </span>

                <span>
                  Status
                </span>

                <span>
                  Date
                </span>

              </div>

              {orders
                .slice()
                .reverse()
                .map((order) => (

                  <div
                    className="transaction-row"
                    key={order.id}
                  >

                    <span>
                      {order.id}
                    </span>

                    <span>
                      {order.customer?.name ||
                        "Customer"}
                    </span>

                    <strong>
                      ₹
                      {formatPrice(
                        order.total
                      )}
                    </strong>

                    <span
                      className={
                        order.paymentStatus ===
                        "Failed"
                          ? "failed"
                          : "paid"
                      }
                    >
                      {order.paymentStatus ||
                        "Paid"}
                    </span>

                    <span>
                      {order.date}
                    </span>

                  </div>

                ))}

            </div>

          )}

        </section>

        {/* ====================================
            RECENT PRODUCTS
        ==================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>
                BuyZen Catalog
              </h2>

              <p>
                Products available in the BuyZen
                catalog.
              </p>

            </div>

            <button
              className="view-all-button"
              onClick={() =>
                navigate(
                  "/merchant/products"
                )
              }
            >
              Manage Products →
            </button>

          </div>

          {products.length === 0 ? (

            <div className="catalog-empty">

              <div>
                📦
              </div>

              <h3>
                No products
              </h3>

              <p>
                Your BuyZen catalog is empty.
              </p>

            </div>

          ) : (

            <div className="recent-products">

              {products
                .slice()
                .reverse()
                .map((product) => (

                  <div
                    className="recent-product"
                    key={product.id}
                  >

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="recent-product-placeholder">
                        📦
                      </div>

                    )}

                    <div>

                      <strong>
                        {product.name}
                      </strong>

                      <span>
                        {product.category}
                      </span>

                      <small>
                        BuyZen Catalog
                      </small>

                    </div>

                    <strong>
                      ₹
                      {formatPrice(
                        product.price
                      )}
                    </strong>

                  </div>

                ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default MerchantDashboard;