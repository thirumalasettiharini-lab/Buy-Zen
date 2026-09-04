const express = require("express");
const crypto = require("crypto");
const catalog = require("../data/catalog");

const router = express.Router();

// =====================================================
// CONVERT PRODUCT FOR API
// =====================================================

const toAgentProduct = (product) => ({
  ...product,

  // API clients can use either field
  id: product.product_id,

  // Make sure merchant products have a source
  source: product.source || "catalog",
});

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", (req, res) => {
  const {
    q = "",
    category = "",
    maxPrice,
    inStock,
  } = req.query;

  let results = [...catalog];

  // CATEGORY
  if (category) {
    const normalizedCategory = String(category)
      .trim()
      .toLowerCase();

    results = results.filter(
      (product) =>
        String(product.category || "")
          .toLowerCase() === normalizedCategory
    );
  }

  // SEARCH
  if (q) {
    const needle = String(q)
      .trim()
      .toLowerCase();

    results = results.filter((product) => {
      const searchable = [
        product.name,
        product.category,
        product.description,
        product.color,
        ...(product.tags || []),
        ...Object.values(product.attributes || {}),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(needle);
    });
  }

  // MAX PRICE
  if (maxPrice !== undefined && maxPrice !== "") {
    const parsedMaxPrice = Number(maxPrice);

    if (
      !Number.isFinite(parsedMaxPrice) ||
      parsedMaxPrice < 0
    ) {
      return res.status(400).json({
        error: "maxPrice must be a valid non-negative number.",
      });
    }

    results = results.filter(
      (product) =>
        Number(product.price) <= parsedMaxPrice
    );
  }

  // STOCK
  if (String(inStock).toLowerCase() === "true") {
    results = results.filter(
      (product) =>
        Number(product.stock) > 0 &&
        (
          product.availability === "in_stock" ||
          product.availability === undefined
        )
    );
  }

  res.json({
    merchant_platform: "BuyZen",
    schema_version: "1.0",
    total: results.length,
    products: results.map(toAgentProduct),
  });
});

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:productId", (req, res) => {
  const product = catalog.find(
    (item) =>
      String(item.product_id) ===
      String(req.params.productId)
  );

  if (!product) {
    return res.status(404).json({
      error: "Product not found in the BuyZen catalog.",
    });
  }

  res.json({
    product: toAgentProduct(product),
  });
});

// =====================================================
// ADD MERCHANT PRODUCT
// =====================================================

router.post("/", (req, res) => {
  try {
    const {
      name,
      category,
      color,
      price,
      stock,
      description,
      image,
    } = req.body;

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        error: "Product name is required.",
      });
    }

    if (!category || !String(category).trim()) {
      return res.status(400).json({
        error: "Product category is required.",
      });
    }

    const productPrice = Number(price);
    const productStock = Number(stock);

    if (
      !Number.isFinite(productPrice) ||
      productPrice <= 0
    ) {
      return res.status(400).json({
        error: "Price must be greater than 0.",
      });
    }

    if (
      !Number.isFinite(productStock) ||
      productStock < 0
    ) {
      return res.status(400).json({
        error: "Stock cannot be negative.",
      });
    }

    if (!description || !String(description).trim()) {
      return res.status(400).json({
        error: "Product description is required.",
      });
    }

    if (!image || !String(image).trim()) {
      return res.status(400).json({
        error: "Product image URL is required.",
      });
    }

    // -----------------------------------------------
    // CREATE SERVER PRODUCT ID
    // -----------------------------------------------

    const productId = `merchant-${crypto.randomUUID()}`;

    // -----------------------------------------------
    // CREATE PRODUCT
    // -----------------------------------------------

    const newProduct = {
      product_id: productId,

      id: productId,

      name: String(name).trim(),

      category: String(category)
        .trim()
        .toLowerCase(),

      color: color
        ? String(color).trim()
        : "",

      price: productPrice,

      stock: productStock,

      availability:
        productStock > 0
          ? "in_stock"
          : "out_of_stock",

      description: String(description).trim(),

      image: String(image).trim(),

      source: "merchant",

      merchantProduct: true,

      createdAt: new Date().toISOString(),
    };

    // -----------------------------------------------
    // ADD TO SAME CATALOG
    // -----------------------------------------------

    catalog.push(newProduct);

    console.log(
      "MERCHANT PRODUCT ADDED:",
      newProduct
    );

    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    res.status(201).json({
      message:
        "Merchant product added to BuyZen catalog.",
      product: toAgentProduct(newProduct),
    });
  } catch (error) {
    console.error(
      "ADD MERCHANT PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      error:
        "Could not add merchant product.",
    });
  }
});

// =====================================================
// DELETE MERCHANT PRODUCT
// =====================================================

router.delete("/:productId", (req, res) => {
  const productId = String(req.params.productId);

  const index = catalog.findIndex(
    (product) =>
      String(product.product_id) === productId
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found.",
    });
  }

  const product = catalog[index];

  // Only allow merchant products to be deleted
  if (!product.merchantProduct) {
    return res.status(403).json({
      error:
        "Default BuyZen catalog products cannot be deleted.",
    });
  }

  catalog.splice(index, 1);

  res.json({
    message: "Merchant product deleted.",
    productId,
  });
});
router.get("/debug/merchant-products", (req, res) => {
  const merchantProducts = catalog.filter(
    (product) => product.merchantProduct === true
  );

  console.log("MERCHANT PRODUCTS IN SERVER:");
  console.log(merchantProducts);

  res.json({
    count: merchantProducts.length,
    products: merchantProducts,
  });
});



module.exports = router;
