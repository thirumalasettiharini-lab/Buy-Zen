import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // ================================
        // LOAD BUYZEN SERVER CATALOG
        // ================================

        const response = await fetch("/api/catalog");

        if (!response.ok) {
          throw new Error("Could not load BuyZen catalog");
        }

        const data = await response.json();

        const catalogProducts = (data.products || []).map(
          (product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            description: product.description || "",
            image: product.image || "",
            color: product.color || "",
            stock: product.stock,
            source: "catalog",
          })
        );

        // ================================
        // MERCHANT PRODUCTS
        // ================================

        let merchantProducts = [];

try {
  const storedProducts =
    localStorage.getItem("merchantProducts");

  merchantProducts = storedProducts
    ? JSON.parse(storedProducts)
    : [];
} catch (error) {
  console.error(
    "Invalid merchantProducts data:",
    error
  );

  merchantProducts = [];
}
        const formattedMerchantProducts =
          merchantProducts.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            description:
              product.description ||
              "Product added by our merchant.",
            image: product.image || "",
            color: product.color || "",
            stock: product.stock,
            source: "merchant",
          }));

        // ================================
        // COMBINE PRODUCTS
        // ================================

        const allProducts = [
          ...formattedMerchantProducts,
          ...catalogProducts,
        ];

        setProducts(allProducts);

      } catch (error) {
        console.error(
          "Error loading products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ================================
  // CATEGORY FILTER
  // ================================

  const filteredProducts = selectedCategory
    ? products.filter((product) => {

        if (selectedCategory === "dresses") {
          return (
            product.category === "womens-dresses" ||
            product.category === "Dresses"
          );
        }

        if (selectedCategory === "tops") {
          return (
            product.category === "tops" ||
            product.category === "Tops"
          );
        }

        if (
          selectedCategory === "shoes" ||
          selectedCategory === "bottoms"
        ) {
          return (
            product.category === "womens-shoes" ||
            product.category === "Shoes"
          );
        }

        if (selectedCategory === "accessories") {
          return (
            product.category === "accessories" ||
            product.category === "womens-bags" ||
            product.category === "womens-jewellery" ||
            product.category === "womens-watches" ||
            product.category === "Bags" ||
            product.category === "Jewellery" ||
            product.category === "Watches"
          );
        }

        if (selectedCategory === "electronics") {
          return (
            product.category === "laptops" ||
            product.category === "smartphones" ||
            product.category === "mobile-accessories" ||
            product.category === "tablets" ||
            product.category === "Laptops" ||
            product.category === "Smartphones"
          );
        }

        if (selectedCategory === "laptops") {
          return product.category === "laptops";
        }

        if (
          selectedCategory === "phones" ||
          selectedCategory === "smartphones"
        ) {
          return product.category === "smartphones";
        }

        return true;
      })
    : products;

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <section className="products-page">
        <h1>BuyZen Products</h1>
        <p>Loading products...</p>
      </section>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <section className="products-page">

      <h1>
        {selectedCategory
          ? `${selectedCategory
              .charAt(0)
              .toUpperCase()}${selectedCategory.slice(1)}`
          : "BuyZen Products"}
      </h1>

      <p>
        {selectedCategory
          ? `Showing ${selectedCategory} products`
          : "Discover products from our secure BuyZen catalog."}
      </p>

      {products.some(
        (product) => product.source === "merchant"
      ) && (
        <div className="merchant-catalog-banner">
          ✨ New products added by our merchants
        </div>
      )}

      {selectedCategory && (
        <a
          href="/products"
          className="show-all-products"
        >
          ← Show All Products
        </a>
      )}

      <div className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <ProductCard
              key={`${product.source}-${product.id}`}
              product={product}
            />

          ))

        ) : (

          <div className="no-products">

            <h2>No products found</h2>

            <p>
              We couldn't find products in this category.
            </p>

            <a href="/products">
              View All Products
            </a>

          </div>

        )}

      </div>

    </section>
  );
}

export default Products;
