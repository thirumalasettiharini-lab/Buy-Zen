import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MerchantProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "laptops",
    color: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  // ========================================
  // LOAD MERCHANT PRODUCTS
  // ========================================

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/catalog");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load products."
        );
      }

      // Only show products added by merchant
      const merchantProducts = (data.products || []).filter(
        (product) => product.merchantProduct === true
      );

      setProducts(merchantProducts);
    } catch (error) {
      console.error("LOAD PRODUCTS ERROR:", error);

      alert(
        error.message ||
          "Could not load merchant products."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // ADD PRODUCT
  // ========================================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      form.stock === "" ||
      !form.description.trim() ||
      !form.image.trim()
    ) {
      alert(
        "Please fill all required product details."
      );
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    if (!Number.isFinite(stock) || stock < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const newProduct = {
      name: form.name.trim(),

      category: form.category,

      color: form.color.trim(),

      price,

      stock,

      description: form.description.trim(),

      image: form.image.trim(),

      source: "merchant",

      merchantProduct: true,
    };

    try {
      setAdding(true);

      const response = await fetch("/api/catalog", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to add product."
        );
      }

      // Server generated product_id
      const createdProduct = data.product;

      // Add product to current screen
      setProducts((prev) => [
        ...prev,
        createdProduct,
      ]);

      // Reset form
      setForm({
        name: "",
        category: "laptops",
        color: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });

      alert(
        "Product added to BuyZen catalog successfully! 🛍️"
      );
    } catch (error) {
      console.error(
        "ADD PRODUCT ERROR:",
        error
      );

      alert(
        error.message ||
          "Could not add product."
      );
    } finally {
      setAdding(false);
    }
  };

  // ========================================
  // DELETE PRODUCT
  // ========================================

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    /*
      We are intentionally not deleting from
      localStorage anymore because merchant products
      are now stored in the server catalog.

      Delete API can be added separately.
    */

    alert(
      "Delete functionality will be connected to the server catalog next."
    );
  };

  // ========================================
  // FORMAT CATEGORY
  // ========================================

  const formatCategory = (category) => {
    const categories = {
      laptops: "Laptops",
      smartphones: "Smartphones",
      "mobile-accessories":
        "Mobile Accessories",
      tablets: "Tablets",

      "womens-dresses": "Dresses",

      tops: "Tops",

      "womens-shoes": "Shoes",

      "womens-bags": "Bags",

      "womens-jewellery": "Jewellery",

      "womens-watches": "Watches",
    };

    return (
      categories[category] ||
      category
    );
  };

  // ========================================
  // DASHBOARD
  // ========================================

  return (
    <div className="merchant-products-page">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="merchant-products-header">

        <div>
          <span className="merchant-label">
            BUYZEN MERCHANT PORTAL
          </span>

          <h1>Product Catalog</h1>

          <p>
            Add and manage products available
            on BuyZen.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/merchant")
          }
        >
          ← Dashboard
        </button>

      </div>

      {/* ==================================
          ADD PRODUCT
      ================================== */}

      <div className="add-product-container">

        <h2>➕ Add Product</h2>

        <p>
          Add a product to your BuyZen
          marketplace catalog.
        </p>

        <form onSubmit={handleAddProduct}>

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name *
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Lenovo IdeaPad Gaming 3"
              required
            />

          </div>

          {/* CATEGORY + COLOR */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >

                <optgroup label="Electronics">

                  <option value="laptops">
                    Laptops
                  </option>

                  <option value="smartphones">
                    Smartphones
                  </option>

                  <option value="mobile-accessories">
                    Mobile Accessories
                  </option>

                  <option value="tablets">
                    Tablets
                  </option>

                </optgroup>

                <optgroup label="Fashion">

                  <option value="womens-dresses">
                    Dresses
                  </option>

                  <option value="tops">
                    Tops
                  </option>

                  <option value="womens-shoes">
                    Shoes
                  </option>

                  <option value="womens-bags">
                    Bags
                  </option>

                  <option value="womens-jewellery">
                    Jewellery
                  </option>

                  <option value="womens-watches">
                    Watches
                  </option>

                </optgroup>

              </select>

            </div>

            <div className="form-group">

              <label>
                Color
              </label>

              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="e.g. Silver"
              />

            </div>

          </div>

          {/* PRICE + STOCK */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="50000"
                min="1"
                required
              />

            </div>

            <div className="form-group">

              <label>
                Stock *
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="10"
                min="0"
                required
              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Product Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Example: Lenovo laptop with Ryzen 5 processor, 16GB RAM, 512GB SSD and RTX 3050 graphics. Suitable for gaming and programming."
              rows="5"
              required
            />

            <small>
              Include important specifications
              such as processor, RAM, storage
              and GPU. BuyZen AI uses this
              information when recommending
              products.
            </small>

          </div>

          {/* IMAGE */}

          <div className="form-group">

            <label>
              Product Image URL *
            </label>

            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
              required
            />

          </div>

          {/* IMAGE PREVIEW */}

          {form.image && (
            <div className="merchant-image-preview">

              <p>Image Preview</p>

              <img
                src={form.image}
                alt="Product preview"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />

            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="add-product-button"
            disabled={adding}
          >
            {adding
              ? "Adding Product..."
              : "🛍️ Add Product to Catalog"}
          </button>

        </form>

      </div>

      {/* ==================================
          MERCHANT CATALOG
      ================================== */}

      <div className="merchant-catalog">

        <div className="merchant-section-title">

          <h2>
            Your Products ({products.length})
          </h2>

          <p>
            Products added by your merchant
            account.
          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="empty-catalog">

            <div className="empty-catalog-icon">
              ⏳
            </div>

            <h3>
              Loading products...
            </h3>

            <p>
              Please wait.
            </p>

          </div>

        ) : products.length === 0 ? (

          /* EMPTY */

          <div className="empty-catalog">

            <div className="empty-catalog-icon">
              📦
            </div>

            <h3>
              No products yet
            </h3>

            <p>
              Add your first product above.
            </p>

          </div>

        ) : (

          /* PRODUCTS */

          <div className="merchant-product-grid">

            {products.map((product) => (

              <div
                className="merchant-product-card"
                key={product.product_id || product.id}
              >

                {/* IMAGE */}

                <div className="merchant-product-image">

                  <img
                    src={
                      product.image ||
                      product.thumbnail
                    }
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>

                {/* INFORMATION */}

                <div className="merchant-product-info">

                  <span className="product-category">
                    {formatCategory(
                      product.category
                    )}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  {product.color && (
                    <p>
                      🎨 {product.color}
                    </p>
                  )}

                  <p className="merchant-description">
                    {product.description}
                  </p>

                  <div className="merchant-product-meta">

                    <strong>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <span>
                      📦 Stock:{" "}
                      {product.stock}
                    </span>

                  </div>

                  <div className="merchant-product-actions">

                    <button
                      onClick={() =>
                        navigate(
                          `/product-details/merchant/${
                            product.product_id ||
                            product.id
                          }`
                        )
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="delete-product"
                      onClick={() =>
                        deleteProduct(
                          product.product_id ||
                            product.id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MerchantProducts;