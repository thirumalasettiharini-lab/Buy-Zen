export const productKey = (product) => `${product.source || "catalog"}:${product.id}`;

export const readJSON = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export const addProductToCart = (product, quantity = 1) => {
  const cart = readJSON("cart", []);
  const key = productKey(product);
  const existing = cart.find((item) => productKey(item) === key);
  const next = existing
    ? cart.map((item) => productKey(item) === key ? { ...item, quantity: item.quantity + quantity } : item)
    : [...cart, { ...product, quantity }];
  localStorage.setItem("cart", JSON.stringify(next));
  return next;
};

export const addAuditEvent = async (event) => {
  const entry = { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, timestamp: new Date().toISOString(), ...event };
  const local = readJSON("auditTrail", []);
  localStorage.setItem("auditTrail", JSON.stringify([entry, ...local].slice(0, 200)));
  try {
    await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry) });
  } catch { /* local trail still preserves the demo audit record */ }
  return entry;
};
