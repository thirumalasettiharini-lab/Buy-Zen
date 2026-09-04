import { useNavigate } from "react-router-dom";
import AIShoppingAgent from "../components/AIShoppingAgent";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            AI-POWERED COMMERCE
          </span>

          <h1>
            Shop smarter.
            <br />
            <span>Buy with confidence.</span>
          </h1>

          <p>
            BuyZen uses AI to understand what you need,
            discover the right products, and guide you
            from product discovery to checkout.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById("ai-shopping")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ask BuyZen AI
            </button>

          </div>

          <div className="hero-trust">
            <span>✓ Smart recommendations</span>
            <span>✓ Merchant catalog</span>
            <span>✓ Simple checkout</span>
          </div>

        </div>


        {/* AI PREVIEW CARD */}
        <div className="hero-card">

          <div className="hero-card-top">

            <div className="ai-avatar">
              B
            </div>

            <div>
              <strong>BuyZen AI</strong>
              <span>Shopping Assistant</span>
            </div>

            <div className="online-dot"></div>

          </div>


          <div className="chat-preview user-preview">
            Find me a laptop under ₹50,000
          </div>


          <div className="chat-preview ai-preview">

            <strong>BuyZen AI</strong>

            <p>
              I found products matching your
              budget and requirements.
            </p>

            <div className="mini-product">

              <div className="mini-product-image">
                Product
              </div>

              <div>
                <strong>Best Match</strong>
                <span>Within your budget</span>
              </div>

            </div>

          </div>


          <div className="ai-status">
            <span>●</span> Catalog matched successfully
          </div>

        </div>

      </section>


      {/* AI SHOPPING */}
      <section
        className="ai-section"
        id="ai-shopping"
      >

        <div className="section-heading">

          <span className="section-label">
            AI SHOPPING AGENT
          </span>

          <h2>
            Tell BuyZen what you need.
          </h2>

          <p>
            Describe your requirements naturally and
            let AI find suitable products from the catalog.
          </p>

        </div>

        <div className="ai-agent-wrapper">
          <AIShoppingAgent />
        </div>

      </section>


      {/* CATEGORIES */}
      <section className="category-section">

        <div className="section-heading">

          <span className="section-label">
            EXPLORE
          </span>

          <h2>
            Shop by category
          </h2>

          <p>
            Discover products from our merchant catalog.
          </p>

        </div>


        <div className="categories">

          <button
            className="category-card"
            onClick={() =>
              navigate("/products?category=dresses")
            }
          >
            <div className="category-number">01</div>

            <div className="category-icon">
              Dresses
            </div>

            <h3>Dresses</h3>

            <p>
              Elegant styles for every occasion
            </p>

            <span className="category-arrow">
              →
            </span>
          </button>


          <button
            className="category-card"
            onClick={() =>
              navigate("/products?category=tops")
            }
          >
            <div className="category-number">02</div>

            <div className="category-icon">
              Tops
            </div>

            <h3>Tops</h3>

            <p>
              Modern pieces for your wardrobe
            </p>

            <span className="category-arrow">
              →
            </span>
          </button>


          <button
            className="category-card"
            onClick={() =>
              navigate("/products?category=shoes")
            }
          >
            <div className="category-number">03</div>

            <div className="category-icon">
              Shoes
            </div>

            <h3>Shoes</h3>

            <p>
              Find the perfect pair for your style
            </p>

            <span className="category-arrow">
              →
            </span>
          </button>
          <button
  className="category-card"
  onClick={() =>
    navigate("/products?category=electronics")
  }
>
  <div className="category-number">05</div>

  <div className="category-icon">
    Electronics
  </div>

  <h3>Electronics</h3>

  <p>
    Laptops, smartphones and smart devices
  </p>

  <span className="category-arrow">
    →
  </span>
</button>


          <button
            className="category-card"
            onClick={() =>
              navigate("/products?category=accessories")
            }
          >
            <div className="category-number">04</div>

            <div className="category-icon">
              Accessories
            </div>

            <h3>Accessories</h3>

            <p>
              Complete your look with the right details
            </p>

            <span className="category-arrow">
              →
            </span>
          </button>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="how-section">

        <div className="section-heading">

          <span className="section-label">
            HOW BUYZEN WORKS
          </span>

          <h2>
            From intent to order.
          </h2>

          <p>
            A simpler way to discover and purchase products.
          </p>

        </div>


        <div className="steps">

          <div className="step-card">

            <span className="step-number">
              01
            </span>

            <h3>
              Tell us what you need
            </h3>

            <p>
              Describe your product, budget, color,
              category or preferences.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <span className="step-number">
              02
            </span>

            <h3>
              AI finds the right products
            </h3>

            <p>
              BuyZen searches the available merchant
              catalog and finds suitable options.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <span className="step-number">
              03
            </span>

            <h3>
              Review and choose
            </h3>

            <p>
              Review the recommendations and select
              the product you want.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <span className="step-number">
              04
            </span>

            <h3>
              Checkout and order
            </h3>

            <p>
              Confirm your purchase and complete
              the checkout process.
            </p>

          </div>

        </div>

      </section>


      {/* WHY BUYZEN */}
      <section className="why-section">

        <div className="section-heading">

          <span className="section-label">
            WHY BUYZEN
          </span>

          <h2>
            Commerce built around the customer.
          </h2>

          <p>
            AI discovery combined with a simple
            and transparent shopping experience.
          </p>

        </div>


        <div className="benefits">

          <div className="benefit-card">

            <div className="benefit-icon">
              AI
            </div>

            <h3>
              Intelligent Discovery
            </h3>

            <p>
              Find products using natural language
              instead of searching through endless pages.
            </p>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              ✓
            </div>

            <h3>
              Catalog-Based Results
            </h3>

            <p>
              Recommendations are based on products
              actually available in the merchant catalog.
            </p>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              →
            </div>

            <h3>
              Guided Checkout
            </h3>

            <p>
              Move from product discovery to purchase
              through a clear checkout flow.
            </p>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              ↗
            </div>

            <h3>
              Better Merchant Reach
            </h3>

            <p>
              Help merchants make their products easier
              for AI buyers to discover.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="home-cta">

        <div>

          <span className="section-label">
            READY TO SHOP?
          </span>

          <h2>
            Let AI do the searching.
          </h2>

          <p>
            Tell BuyZen what you're looking for
            and discover products made for you.
          </p>

        </div>


        <button
          className="cta-button"
          onClick={() => navigate("/products")}
        >
          Explore Products →
        </button>

      </section>


      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-container">

          <div className="footer-brand">

            <h2>
              BuyZen
            </h2>

            <p>
              AI-powered commerce that connects
              customer intent with the right products.
            </p>

          </div>


          <div className="footer-column">

            <h3>Shop</h3>

            <button
              onClick={() => navigate("/products")}
            >
              All Products
            </button>

            <button
              onClick={() =>
                navigate("/products?category=dresses")
              }
            >
              Dresses
            </button>

            <button
              onClick={() =>
                navigate("/products?category=tops")
              }
            >
              Tops
            </button>

            <button
              onClick={() =>
                navigate("/products?category=shoes")
              }
            >
              Shoes
            </button>

          </div>


          <div className="footer-column">

            <h3>Customer</h3>

            <button
              onClick={() => navigate("/orders")}
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/cart")}
            >
              My Cart
            </button>

            <button
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>

          </div>


          <div className="footer-column">

            <h3>BuyZen</h3>

            <p>AI Shopping</p>
            <p>Smart Recommendations</p>
            <p>Merchant Catalog</p>
            <p>Simple Checkout</p>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 BuyZen. All rights reserved.
          </span>

          <span>
            AI-powered commerce.
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;
