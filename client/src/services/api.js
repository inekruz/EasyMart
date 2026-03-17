import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProducts = () => API.get("/products");

export const getCart = () =>
  API.get("/cart");
export const addToCart = (productId) =>
  API.post("/cart/add", { productId });
export const updateCartItem = (itemId, quantity) =>
  API.put("/cart/update", { itemId, quantity });
export const removeCartItem = (id) =>
  API.delete(`/cart/remove/${id}`);
export const checkout = () =>
  API.post("/orders/checkout");

export default API;