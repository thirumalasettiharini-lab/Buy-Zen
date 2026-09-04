import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // ==========================================
  // LOAD PRODUCT FROM BUYZEN CATALOG
  // ==========================================

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/catalog/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        console.error("Product loading error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = () => {
    if (!product) return;

    if (Number(product.stock) <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    setAdding(true);

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          product_id: product.product_id,

          name: product.name,

          category: product.category,

          price: Number(product.price),

          currency: product.currency || "INR",

          description: product.description || "",

          image: product.image || "",

          stock: Number(product.stock || 0),

          availability: product.availability,

          attributes: product.attributes || {},

          tags: product.tags || [],

          merchant_id: product.merchant_id,

          source: "buyzen",

          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setTimeout(() => {
      setAdding(false);
      alert(`${product.name} added to cart 🛒`);
    }, 300);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="product-details">
        <div className="details-loading">
          <h2>Loading product...</h2>
          <p>Please wait.</p>
        </div>
      </section>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <section className="product-details">
        <div className="details-not-found">
          <h2>Product not found</h2>

          <p>
            This product is not available in the
            BuyZen catalog.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            ← Back to Products
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // PRODUCT INFORMATION
  // ==========================================

  const attributes = product.attributes || {};

  const isInStock =
    product.availability === "in_stock" &&
    Number(product.stock) > 0;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="product-details">

      {/* BACK BUTTON */}

      <button
        className="details-back-button"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="details-container">

        {/* ====================================
            PRODUCT IMAGE
        ==================================== */}

        <div className="details-image">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="no-product-image">
              <span>🛍️</span>
              <p>No image available</p>
            </div>
          )}

        </div>

        {/* ====================================
            PRODUCT INFORMATION
        ==================================== */}

        <div className="details-info">

          {/* CATEGORY */}

          <span className="details-category">
            {product.category}
          </span>

          {/* NAME */}

          <h1>
            {product.name}
          </h1>

          {/* DESCRIPTION */}

          <p className="details-description">
            {product.description}
          </p>

          {/* PRICE */}

          <div className="details-price">
            ₹
            {Number(product.price).toLocaleString(
              "en-IN"
            )}
          </div>

          {/* STOCK */}

          <div
            className={
              isInStock
                ? "details-stock in-stock"
                : "details-stock out-stock"
            }
          >
            {isInStock
              ? `✓ In Stock (${product.stock} available)`
              : "✕ Out of Stock"}
          </div>

          {/* ====================================
              PRODUCT ATTRIBUTES
          ==================================== */}

          {Object.keys(attributes).length > 0 && (
            <div className="product-attributes">

              <h3>
                Product Specifications
              </h3>

              {Object.entries(attributes).map(
                ([key, value]) => (
                  <div
                    className="attribute-row"
                    key={key}
                  >

                    <span className="attribute-name">
                      {formatAttributeName(key)}
                    </span>

                    <strong>
                      {String(value)}
                    </strong>

                  </div>
                )
              )}

            </div>
          )}

          {/* ====================================
              TAGS
          ==================================== */}

          {product.tags &&
            product.tags.length > 0 && (
              <div className="product-tags">

                {product.tags.map((tag) => (
                  <span key={tag}>
                    #{tag}
                  </span>
                ))}

              </div>
            )}

          {/* ====================================
              MERCHANT
          ==================================== */}

          <div className="product-merchant">

            <span>
              Sold by
            </span>

            <strong>
              {product.merchant_id}
            </strong>

          </div>

          {/* ====================================
              ADD TO CART
          ==================================== */}

          <button
            className="details-cart-button"
            onClick={addToCart}
            disabled={!isInStock || adding}
          >

            {adding
              ? "Adding..."
              : isInStock
              ? "🛒 Add to Cart"
              : "Out of Stock"}

          </button>

          {/* CHECKOUT */}

          {isInStock && (
            <button
              className="details-buy-button"
              onClick={() => {
                addToCart();
                navigate("/cart");
              }}
            >
              Buy Now →
            </button>
          )}

        </div>

      </div>

    </section>
  );
}

// ==========================================
// FORMAT ATTRIBUTE NAME
// ==========================================

function formatAttributeName(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) =>
      letter.toUpperCase()
    );
}

export default ProductDetails;