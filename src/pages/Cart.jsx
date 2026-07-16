import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { checkout } from "../lib/api";

function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function Cart() {
  const { user } = useAuth();
  const { cart, updateQuantity, removeItem, refresh } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-muted">
          You need to{" "}
          <Link to="/login" className="text-primary underline underline-offset-4">
            sign in
          </Link>{" "}
          to view your cart.
        </p>
      </div>
    );
  }

  const items = cart?.cartItems ?? [];

  async function handleCheckout() {
    setPlacing(true);
    setError("");
    try {
      const { order } = await checkout();
      await refresh();
      navigate("/orders", { state: { justPlaced: order._id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl">Your cart</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-muted">
          Nothing here yet. <Link to="/" className="text-primary underline underline-offset-4">Browse the catalog</Link>.
        </p>
      ) : (
        <div className="mt-10 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between py-4">
              <div>
                <p className="font-mono-tag text-xs text-muted">{item.productId.slice(-6)}</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-sm hover:bg-card"
                    >
                      −
                    </button>
                    <span className="font-mono-tag w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 text-sm hover:bg-card"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs text-muted underline underline-offset-4 hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-mono-tag text-sm">{formatPrice(item.subtotal)}</p>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="font-display text-xl">
            Total <span className="font-mono-tag text-primary">{formatPrice(cart?.totalPrice ?? 0)}</span>
          </p>
          <button
            onClick={handleCheckout}
            disabled={placing}
            className="bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {placing ? "Placing order…" : "Checkout"}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}
