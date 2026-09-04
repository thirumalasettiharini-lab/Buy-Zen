const catalog = [

  // =========================
  // LAPTOPS
  // =========================

  {
    product_id: "bz-laptop-001",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Developer Laptop Pro",
    category: "laptops",
    price: 64999,
    currency: "INR",
    stock: 8,
    availability: "in_stock",
    description: "Programming and multitasking laptop for students and developers.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      processor: "Intel Core i5",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "Integrated"
    },
    tags: ["coding", "student", "development", "multitasking"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-laptop-002",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Gaming Laptop X",
    category: "laptops",
    price: 74999,
    currency: "INR",
    stock: 5,
    availability: "in_stock",
    description: "High performance laptop for gaming and creative work.",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      processor: "AMD Ryzen 7",
      ram: "16GB",
      storage: "1TB SSD",
      gpu: "Dedicated GPU"
    },
    tags: ["gaming", "video-editing", "performance"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // SMARTPHONES
  // =========================

  {
    product_id: "bz-phone-001",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Smartphone Plus",
    category: "smartphones",
    price: 29999,
    currency: "INR",
    stock: 20,
    availability: "in_stock",
    description: "Balanced smartphone for daily use and productivity.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      ram: "8GB",
      storage: "256GB",
      color: "Black"
    },
    tags: ["smartphone", "daily-use", "productivity"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // HEADPHONES
  // =========================

  {
    product_id: "bz-headphone-001",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Wireless Headphones",
    category: "electronics",
    price: 2999,
    currency: "INR",
    stock: 18,
    availability: "in_stock",
    description: "Wireless headphones with comfortable design for music and work.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      connection: "Bluetooth",
      color: "Black",
      battery: "30 hours"
    },
    tags: ["headphones", "wireless", "music", "bluetooth"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // SMARTWATCH
  // =========================

  {
    product_id: "bz-watch-001",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Smart Watch",
    category: "electronics",
    price: 3999,
    currency: "INR",
    stock: 14,
    availability: "in_stock",
    description: "Modern smartwatch for fitness tracking and notifications.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      color: "Black",
      connectivity: "Bluetooth",
      battery: "7 days"
    },
    tags: ["smartwatch", "fitness", "wearable", "electronics"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // DRESSES
  // =========================

  {
    product_id: "bz-dress-001",
    merchant_id: "buyzen-demo-merchant",
    name: "Floral Summer Dress",
    category: "dresses",
    price: 1499,
    currency: "INR",
    stock: 15,
    availability: "in_stock",
    description: "Beautiful floral summer dress for casual outings.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Pink",
      size: "S,M,L,XL"
    },
    tags: ["dress", "summer", "casual", "floral", "pink"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-dress-002",
    merchant_id: "buyzen-demo-merchant",
    name: "Elegant Black Party Dress",
    category: "dresses",
    price: 2499,
    currency: "INR",
    stock: 10,
    availability: "in_stock",
    description: "Elegant dress suitable for parties and evening events.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Black",
      size: "S,M,L,XL"
    },
    tags: ["dress", "party", "black", "evening", "elegant"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-dress-003",
    merchant_id: "buyzen-demo-merchant",
    name: "Casual Midi Dress",
    category: "dresses",
    price: 1199,
    currency: "INR",
    stock: 18,
    availability: "in_stock",
    description: "Comfortable midi dress for everyday wear.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Blue",
      size: "S,M,L,XL"
    },
    tags: ["dress", "casual", "daily", "blue", "comfortable"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-dress-004",
    merchant_id: "buyzen-demo-merchant",
    name: "Red Evening Dress",
    category: "dresses",
    price: 1999,
    currency: "INR",
    stock: 12,
    availability: "in_stock",
    description: "Stylish evening dress for special occasions.",
    image: "https://images.unsplash.com/photo-1585488430332-9c1d4a1c5e7b?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Red",
      size: "S,M,L,XL"
    },
    tags: ["dress", "red", "party", "evening", "occasion"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // TOPS
  // =========================

  {
    product_id: "bz-top-001",
    merchant_id: "buyzen-demo-merchant",
    name: "Women's Casual Top",
    category: "tops",
    price: 799,
    currency: "INR",
    stock: 25,
    availability: "in_stock",
    description: "Comfortable casual top for everyday wear.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "White",
      size: "S,M,L,XL"
    },
    tags: ["top", "casual", "white", "daily"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // SHOES
  // =========================

  {
    product_id: "bz-shoe-001",
    merchant_id: "buyzen-demo-merchant",
    name: "Women's Running Shoes",
    category: "shoes",
    price: 2499,
    currency: "INR",
    stock: 16,
    availability: "in_stock",
    description: "Lightweight running shoes designed for workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Footwear",
      color: "Red",
      size: "5,6,7,8,9"
    },
    tags: ["shoes", "running", "sports", "fitness"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-shoe-002",
    merchant_id: "buyzen-demo-merchant",
    name: "Classic White Sneakers",
    category: "shoes",
    price: 1999,
    currency: "INR",
    stock: 20,
    availability: "in_stock",
    description: "Classic sneakers for everyday casual outfits.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Footwear",
      color: "White",
      size: "5,6,7,8,9"
    },
    tags: ["shoes", "sneakers", "casual", "white", "daily"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },

  {
    product_id: "bz-shoe-003",
    merchant_id: "buyzen-demo-merchant",
    name: "Women's Formal Heels",
    category: "shoes",
    price: 1799,
    currency: "INR",
    stock: 11,
    availability: "in_stock",
    description: "Elegant heels for office and formal occasions.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Footwear",
      color: "Black",
      size: "5,6,7,8,9"
    },
    tags: ["shoes", "heels", "formal", "office", "black"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // BAGS
  // =========================

  {
    product_id: "bz-bag-001",
    merchant_id: "buyzen-demo-merchant",
    name: "Women's Casual Handbag",
    category: "accessories",
    price: 1499,
    currency: "INR",
    stock: 18,
    availability: "in_stock",
    description: "Stylish handbag for everyday use.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Brown"
    },
    tags: ["handbag", "fashion", "casual", "women"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // SUNGLASSES
  // =========================

  {
    product_id: "bz-sunglasses-001",
    merchant_id: "buyzen-demo-merchant",
    name: "Classic Black Sunglasses",
    category: "accessories",
    price: 799,
    currency: "INR",
    stock: 30,
    availability: "in_stock",
    description: "Stylish sunglasses for everyday outdoor use.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen Fashion",
      color: "Black"
    },
    tags: ["sunglasses", "fashion", "outdoor", "black"],
    agent_actions: ["view", "recommend", "add_to_cart", "checkout"]
  },


  // =========================
  // MOUSE
  // =========================

  {
    product_id: "bz-mouse-001",
    merchant_id: "buyzen-demo-merchant",
    name: "BuyZen Wireless Mouse",
    category: "electronics",
    price: 1499,
    currency: "INR",
    stock: 35,
    availability: "in_stock",
    description: "Wireless mouse for laptop productivity and coding.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    attributes: {
      brand: "BuyZen",
      connection: "Wireless",
      color: "Black"
    },
    tags: ["mouse", "laptop", "coding", "accessory", "wireless"],
    agent_actions: ["view", "recommend", "add_to_cart"]
  }

];

module.exports = catalog;
