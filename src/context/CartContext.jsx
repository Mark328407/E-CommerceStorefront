import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function refresh() {
    if (!user) {
      setCart(null);
      return;
    }
    setIsLoading(true);
    try {
      const { cart } = await api.getCart();
      setCart(cart);
    } catch {
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function addItem(productId, quantity) {
    const { cart } = await api.addToCart(productId, quantity);
    setCart(cart);
  }

  async function updateQuantity(productId, quantity) {
    const { updatedCart } = await api.updateCartQuantity(productId, quantity);
    setCart(updatedCart);
  }

  async function removeItem(productId) {
    const { cart } = await api.removeFromCart(productId);
    setCart(cart);
  }

  async function clear() {
    const { cart } = await api.clearCart();
    setCart(cart);
  }

  const itemCount = cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, isLoading, refresh, addItem, updateQuantity, removeItem, clear, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
