// Base URL for the E-Commerce API (Capstone 2, Express + MongoDB, deployed on Render).
// Override locally via .env -> VITE_API_BASE_URL for local backend testing.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://capstone-2-wxg9.onrender.com";

function getToken() {
  return localStorage.getItem("access_token");
}

async function request(path, options = {}) {
  const { method = "GET", body, auth = false } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) ||
      `Request failed with status ${res.status}`;
    throw new Error(typeof message === "string" ? message : "Request failed");
  }

  return data;
}

// ---- Products ----
export const getActiveProducts = () => request("/products/active");

export const getProduct = (id) => request(`/products/${id}`);

export const searchByName = (name) =>
  request("/products/search-by-name", { method: "POST", body: { name } });

// ---- Auth ----
export const registerUser = (payload) =>
  request("/users/register", { method: "POST", body: payload });

export const loginUser = (payload) =>
  request("/users/login", { method: "POST", body: payload });

export const getUserDetails = () => request("/users/details", { auth: true });

// ---- Cart ----
export const getCart = () => request("/cart/get-cart", { auth: true });

export const addToCart = (productId, quantity) =>
  request("/cart/add-to-cart", {
    method: "POST",
    auth: true,
    body: { productId, quantity },
  });

export const updateCartQuantity = (productId, newQuantity) =>
  request("/cart/update-cart-quantity", {
    method: "PATCH",
    auth: true,
    body: { productId, newQuantity },
  });

export const removeFromCart = (productId) =>
  request(`/cart/${productId}/remove-from-cart`, {
    method: "PATCH",
    auth: true,
  });

export const clearCart = () =>
  request("/cart/clear-cart", { method: "PUT", auth: true });

// ---- Orders ----
export const checkout = () =>
  request("/orders/checkout", { method: "POST", auth: true });

export const getMyOrders = () => request("/orders/my-orders", { auth: true });
