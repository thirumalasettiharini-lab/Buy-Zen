import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { addAuditEvent, addProductToCart } from "../utils/commerce";

function AIShoppingAgent() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi! I'm BuyZen AI 👋 Tell me what you are looking for, such as “blue dress under ₹2000”, “black shoes”, “iPhone”, or “Apple phone”.",
      products: [],
    },
  ]);

  // =====================================================
  // LOAD BUYZEN CATALOG
  // =====================================================

  useEffect(() => {
    fetch("/api/catalog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Catalog request failed");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error("Catalog loading error:", error);
        setProducts([]);
      });
  }, []);

  // =====================================================
  // NORMALIZE TEXT
  // =====================================================

  const normalize = (text) => {
    return String(text || "")
      .toLowerCase()
      .replace(/₹/g, " ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // =====================================================
  // DETECT CATEGORY
  // =====================================================

  const detectCategory = (text) => {
    const query = normalize(text);

    // iPhone
    if (
      query.includes("iphone") ||
      query.includes("i phone")
    ) {
      return "iphone";
    }

    // Smartphones
    if (
      query.includes("smartphone") ||
      query.includes("smart phone") ||
      query.includes("mobile") ||
      query.includes("phone")
    ) {
      return "smartphones";
    }

    // Dresses / clothing
    if (
      query.includes("dress") ||
      query.includes("frock") ||
      query.includes("gown") ||
      query.includes("saree") ||
      query.includes("sari") ||
      query.includes("kurti") ||
      query.includes("top") ||
      query.includes("shirt") ||
      query.includes("jeans")
    ) {
      return "dresses";
    }

    // Shoes
    if (
      query.includes("shoe") ||
      query.includes("shoes") ||
      query.includes("sneaker") ||
      query.includes("sneakers") ||
      query.includes("sandals") ||
      query.includes("heels")
    ) {
      return "shoes";
    }

    // Laptop
    if (
      query.includes("laptop") ||
      query.includes("notebook")
    ) {
      return "laptops";
    }

    // Audio
    if (
      query.includes("headphone") ||
      query.includes("headphones") ||
      query.includes("earbuds") ||
      query.includes("earbud") ||
      query.includes("earphone") ||
      query.includes("earphones")
    ) {
      return "audio";
    }

    // Watch
    if (
      query.includes("watch") ||
      query.includes("smartwatch") ||
      query.includes("smart watch")
    ) {
      return "watches";
    }

    // Bags
    if (
      query.includes("bag") ||
      query.includes("handbag") ||
      query.includes("backpack")
    ) {
      return "bags";
    }

    return "";
  };

  // =====================================================
  // DETECT BRAND
  // =====================================================

  const detectBrand = (text) => {
    const query = normalize(text);

    const brands = [
      "apple",
      "samsung",
      "oneplus",
      "xiaomi",
      "redmi",
      "realme",
      "vivo",
      "oppo",
      "sony",
      "nike",
      "adidas",
      "puma",
      "reebok",
      "hp",
      "dell",
      "lenovo",
      "asus",
      "acer",
      "boat",
      "jbl",
      "canon",
      "nikon",
    ];

    return (
      brands.find((brand) => {
        return query.includes(brand);
      }) || ""
    );
  };

  // =====================================================
  // DETECT COLOR
  // =====================================================

  const detectColor = (text) => {
    const query = normalize(text);

    const colors = [
      "black",
      "white",
      "blue",
      "red",
      "green",
      "pink",
      "yellow",
      "purple",
      "orange",
      "brown",
      "grey",
      "gray",
      "beige",
      "maroon",
      "gold",
      "golden",
      "silver",
    ];

    return (
      colors.find((color) => {
        return query.includes(color);
      }) || ""
    );
  };

  // =====================================================
  // DETECT MAX PRICE
  // =====================================================

  const detectMaxPrice = (text) => {
    const query = String(text || "");

    const patterns = [
      /under\s*₹?\s*([\d,]+)/i,
      /below\s*₹?\s*([\d,]+)/i,
      /less\s*than\s*₹?\s*([\d,]+)/i,
      /upto\s*₹?\s*([\d,]+)/i,
      /up\s*to\s*₹?\s*([\d,]+)/i,
      /budget\s*(?:of)?\s*₹?\s*([\d,]+)/i,
      /within\s*₹?\s*([\d,]+)/i,
      /₹\s*([\d,]+)/i,
    ];

    for (const pattern of patterns) {
      const match = query.match(pattern);

      if (match) {
        return Number(
          match[1].replace(/,/g, "")
        );
      }
    }

    return null;
  };

  // =====================================================
  // SAVE CUSTOMER DEMAND
  // =====================================================

  const saveDemand = async (demand) => {
    let all = [];

    try {
      all = JSON.parse(
        localStorage.getItem("customerDemands") || "[]"
      );

      if (!Array.isArray(all)) {
        all = [];
      }
    } catch {
      all = [];
    }

    // Check whether the same request already exists
    const existingIndex = all.findIndex(
      (item) =>
        normalize(item.request) ===
        normalize(demand.request)
    );

    if (existingIndex !== -1) {
      all[existingIndex].requests =
        Number(all[existingIndex].requests || 0) + 1;

      all[existingIndex].lastRequest =
        new Date().toISOString();

      localStorage.setItem(
        "customerDemands",
        JSON.stringify(all)
      );

      // Also send updated demand to backend
      try {
        await fetch("/api/demands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            all[existingIndex]
          ),
        });
      } catch (error) {
        console.log("Demand API unavailable");
      }

      return;
    }

    // New customer demand
    const entry = {
      id: Date.now(),
      request: demand.request,
      category: demand.category || "Product",
      brand: demand.brand || "Any",
      color: demand.color || "Any",
      budget: demand.budget || "",
      requests: 1,
      lastRequest: new Date().toISOString(),
    };

    // Save locally
    localStorage.setItem(
      "customerDemands",
      JSON.stringify([entry, ...all])
    );

    // Send to merchant backend
    try {
      await fetch("/api/demands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.log(
        "Demand API unavailable, saved locally."
      );
    }
  };

  // =====================================================
  // CHECK PRODUCT CATEGORY
  // =====================================================

  const productHasCategory = (product, category) => {
    const productText = normalize(
      [
        product.name,
        product.category,
        product.description,
        ...(product.tags || []),
        ...Object.values(
          product.attributes || {}
        ),
      ].join(" ")
    );

    const productCategory = normalize(
      product.category
    );

    // iPhone
    if (category === "iphone") {
      return (
        productText.includes("iphone") ||
        (
          productText.includes("apple") &&
          (
            productText.includes("phone") ||
            productText.includes("smartphone") ||
            productCategory.includes("phone")
          )
        )
      );
    }

    // Smartphone
    if (category === "smartphones") {
      return (
        productCategory.includes("phone") ||
        productCategory.includes("smartphone") ||
        productText.includes("smartphone") ||
        productText.includes("mobile phone") ||
        productText.includes("smart phone") ||
        productText.includes("phone")
      );
    }

    // Dresses
    if (category === "dresses") {
      return (
        productCategory.includes("dress") ||
        productCategory.includes("clothing") ||
        productCategory.includes("fashion") ||
        productText.includes("dress") ||
        productText.includes("frock") ||
        productText.includes("gown") ||
        productText.includes("saree") ||
        productText.includes("sari") ||
        productText.includes("kurti") ||
        productText.includes("shirt") ||
        productText.includes("jeans") ||
        productText.includes("top")
      );
    }

    // Shoes
    if (category === "shoes") {
      return (
        productCategory.includes("shoe") ||
        productCategory.includes("footwear") ||
        productText.includes("shoe") ||
        productText.includes("sneaker") ||
        productText.includes("sandals") ||
        productText.includes("heels")
      );
    }

    // Laptop
    if (category === "laptops") {
      return (
        productCategory.includes("laptop") ||
        productText.includes("laptop") ||
        productText.includes("notebook")
      );
    }

    // Audio
    if (category === "audio") {
      return (
        productCategory.includes("audio") ||
        productText.includes("headphone") ||
        productText.includes("earbuds") ||
        productText.includes("earphone")
      );
    }

    // Watches
    if (category === "watches") {
      return (
        productCategory.includes("watch") ||
        productText.includes("watch")
      );
    }

    // Bags
    if (category === "bags") {
      return (
        productCategory.includes("bag") ||
        productText.includes("bag") ||
        productText.includes("handbag") ||
        productText.includes("backpack")
      );
    }

    return true;
  };

  // =====================================================
  // CHECK PRODUCT MATCH
  // =====================================================

  const productMatchesQuery = (
    product,
    query
  ) => {
    const text = normalize(query);

    const searchable = normalize(
      [
        product.name,
        product.category,
        product.description,
        product.color,
        product.brand,
        ...(product.tags || []),
        ...Object.values(
          product.attributes || {}
        ),
      ].join(" ")
    );

    const category =
      detectCategory(query);

    const brand =
      detectBrand(query);

    const color =
      detectColor(query);

    const maxPrice =
      detectMaxPrice(query);

    // =================================================
    // CATEGORY MUST MATCH
    // =================================================

    if (category) {
      const categoryMatch =
        productHasCategory(
          product,
          category
        );

      if (!categoryMatch) {
        return false;
      }
    }

    // =================================================
    // BRAND MUST MATCH
    // =================================================

    if (brand) {
      if (!searchable.includes(brand)) {
        return false;
      }
    }

    // =================================================
    // COLOR MUST MATCH
    // =================================================

    if (color) {
      if (!searchable.includes(color)) {
        return false;
      }
    }

    // =================================================
    // PRICE MUST MATCH
    // =================================================

    if (
      maxPrice !== null &&
      Number(product.price) > maxPrice
    ) {
      return false;
    }

    // =================================================
    // GENERAL SEARCH
    // =================================================

    if (
      !category &&
      !brand &&
      !color &&
      maxPrice === null
    ) {
      const stopWords = [
        "show",
        "give",
        "want",
        "need",
        "find",
        "looking",
        "for",
        "me",
        "some",
        "please",
        "product",
        "products",
        "can",
        "you",
        "get",
        "buy",
      ];

      const words = text
        .split(" ")
        .filter(
          (word) =>
            word.length > 2 &&
            !stopWords.includes(word)
        );

      if (words.length === 0) {
        return false;
      }

      return words.some((word) =>
        searchable.includes(word)
      );
    }

    return true;
  };

  // =====================================================
  // SEARCH BUYZEN CATALOG
  // =====================================================

  const searchCatalog = (query) => {
    return products.filter((product) =>
      productMatchesQuery(
        product,
        query
      )
    );
  };

  // =====================================================
  // BUILD DEMAND MESSAGE
  // =====================================================

  const buildDemandMessage = (
    text,
    category,
    brand,
    color,
    maxPrice
  ) => {
    let reply =
      `Sorry, I couldn't find "${text}" in the BuyZen catalog.`;

    if (brand && category) {
      if (category === "iphone") {
        reply =
          `Sorry, Apple iPhone products are not available in the BuyZen catalog right now.`;
      } else {
        reply =
          `Sorry, ${brand} ${category} products are not available in the BuyZen catalog right now.`;
      }
    } else if (brand) {
      reply =
        `Sorry, ${brand} products are not available in the BuyZen catalog right now.`;
    } else if (color && category) {
      reply =
        `Sorry, I couldn't find a ${color} ${category} in the BuyZen catalog right now.`;
    } else if (category) {
      reply =
        `Sorry, I couldn't find the requested ${category} in the BuyZen catalog right now.`;
    } else if (color) {
      reply =
        `Sorry, I couldn't find ${color} products in the BuyZen catalog right now.`;
    }

    if (maxPrice !== null) {
      reply += ` Your budget was ₹${maxPrice.toLocaleString(
        "en-IN"
      )}.`;
    }

    reply +=
      " 🔥 I've recorded your request as customer demand for the merchant.";

    return reply;
  };

  // =====================================================
  // ASK AGENT
  // =====================================================

  const ask = async () => {
    const text = message.trim();

    if (!text || loading) {
      return;
    }

    // Show user message
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text,
        products: [],
      },
    ]);

    setMessage("");
    setLoading(true);

    await addAuditEvent({
      action: "AGENT_REQUEST",
      details: {
        message: text,
      },
      money_action: false,
    });

    try {
      // =================================================
      // EXTRACT CUSTOMER REQUIREMENTS
      // =================================================

      const category =
        detectCategory(text);

      const brand =
        detectBrand(text);

      const color =
        detectColor(text);

      const maxPrice =
        detectMaxPrice(text);

      // =================================================
      // SEARCH ONLY REAL BUYZEN CATALOG
      // =================================================

      const catalogMatches =
        searchCatalog(text);

      // =================================================
      // PRODUCTS FOUND
      // =================================================

      if (catalogMatches.length > 0) {
        let reply =
          "I found these products in the BuyZen catalog.";

        if (
          brand &&
          category === "iphone"
        ) {
          reply =
            "I found these Apple iPhone products in the BuyZen catalog.";
        } else if (
          brand &&
          category
        ) {
          reply =
            `I found these ${brand} ${category} products matching your request.`;
        } else if (brand) {
          reply =
            `I found these ${brand} products matching your request.`;
        } else if (
          color &&
          category
        ) {
          reply =
            `I found these ${color} ${category} products matching your request.`;
        } else if (category) {
          reply =
            `I found these ${category} matching your request.`;
        } else if (color) {
          reply =
            `I found these ${color} products matching your request.`;
        }

        if (maxPrice !== null) {
          reply +=
            ` All shown products are within ₹${maxPrice.toLocaleString(
              "en-IN"
            )}.`;
        }

        await addAuditEvent({
          action:
            "CATALOG_RECOMMENDATION",
          details: {
            query: text,
            category,
            brand,
            color,
            budget: maxPrice,
            productIds:
              catalogMatches.map(
                (product) =>
                  product.id
              ),
          },
          money_action: false,
        });

        setMessages((current) => [
          ...current,
          {
            role: "ai",
            text: reply,
            products:
              catalogMatches.slice(0, 6),
          },
        ]);

        return;
      }

      // =================================================
      // NO PRODUCT FOUND
      // DO NOT CALL BACKEND AI
      // SAVE CUSTOMER DEMAND
      // =================================================

      await saveDemand({
        request: text,
        category:
          category || "Product",
        brand:
          brand || "Any",
        color:
          color || "Any",
        budget:
          maxPrice || "",
      });

      await addAuditEvent({
        action:
          "UNAVAILABLE_DEMAND_CAPTURED",
        details: {
          request: text,
          category:
            category || "Product",
          brand:
            brand || "Any",
          color:
            color || "Any",
          budget:
            maxPrice || "",
        },
        money_action: false,
      });

      const demandMessage =
        buildDemandMessage(
          text,
          category,
          brand,
          color,
          maxPrice
        );

      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text: demandMessage,
          products: [],
        },
      ]);
    } catch (error) {
      console.error(
        "AI Agent Error:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text:
            "I couldn't process your request right now. No product was added to your cart and no payment was started.",
          products: [],
        },
      ]);

      await addAuditEvent({
        action: "AGENT_FAILURE",
        details: {
          stage: "catalog-search",
          message:
            error.message,
        },
        outcome:
          "gracefully_handled",
        money_action: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  const add = async (product) => {
    addProductToCart({
      ...product,
      source: "catalog",
    });

    await addAuditEvent({
      action: "ADD_TO_CART",
      product_id: product.id,
      details: {
        name: product.name,
        price: product.price,
      },
      money_action: false,
    });

    setMessages((current) => [
      ...current,
      {
        role: "ai",
        text:
          `${product.name} was added to your cart 🛒. No payment has been made.`,
        products: [],
      },
    ]);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="ai-agent">

      <h2>
        🤖 BuyZen AI Commerce Agent
      </h2>

      <p>
        Catalog-grounded recommendations •
        customer demand detection •
        controlled cart actions
      </p>

      <div className="ai-chat">

        {/* MESSAGES */}
        <div className="ai-messages">

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className="ai-message-wrapper"
              >

                {/* MESSAGE */}
                <div
                  className={
                    msg.role === "user"
                      ? "ai-user-message"
                      : "ai-message"
                  }
                >
                  {msg.text}
                </div>

                {/* PRODUCTS */}
                {msg.products?.length >
                  0 && (

                  <div className="ai-recommendations">

                    {msg.products.map(
                      (product) => (

                        <div
                          key={
                            product.id
                          }
                          className="agent-product"
                        >

                          <ProductCard
                            product={{
                              ...product,
                              source:
                                "catalog",
                            }}
                          />

                          <button
                            onClick={() =>
                              add(
                                product
                              )
                            }
                          >
                            🛒 Agent: Add
                            to cart
                          </button>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>
            )
          )}

          {/* LOADING */}
          {loading && (
            <div className="ai-message">
              🔎 Searching the BuyZen catalog...
            </div>
          )}

        </div>

        {/* INPUT */}
        <div className="ai-input">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                ask();
              }
            }}
            placeholder='Try: "blue dress under ₹2000"'
            maxLength={1000}
            disabled={loading}
          />

          <button
            onClick={ask}
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : "Ask AI"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/cart")
            }
          >
            Review cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default AIShoppingAgent;