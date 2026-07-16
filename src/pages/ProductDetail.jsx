import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  async function handleAddToCart() {
    if (!user) {
      navigate("/login", { state: { from: `/products/${id}` } });
      return;
    }
    if (!product) return;
    setAdding(true);
    setFeedback("");
    try {
      await addItem(product._id, quantity);
      setFeedback("Added to cart.");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Couldn't add to cart.");
    } finally {
      setAdding(false);
    }
  }

  if (status === "loading") {
    return <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">Loading item…</p>;
  }

  if (status === "error" || !product) {
    return <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">Product not found.</p>;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2">
      <div className="flex aspect-square items-center justify-center bg-card">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-6xl text-muted/30">{product.name.charAt(0)}</span>
        )}
      </div>

      <div>
        <p className="font-mono-tag text-xs text-muted">
          {product.isActive ? "IN STOCK" : "ARCHIVED"}
        </p>
        <h1 className="font-display mt-3 text-3xl">{product.name}</h1>
        <p className="font-mono-tag mt-4 text-xl text-primary">{formatPrice(product.price)}</p>
        <p className="mt-6 text-muted">{product.description}</p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-sm hover:bg-card"
            >
              −
            </button>
            <span className="font-mono-tag w-10 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-sm hover:bg-card"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex-1 bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {adding ? "Adding…" : "Add to cart"}
          </button>
        </div>

        {feedback && <p className="mt-3 text-sm text-muted">{feedback}</p>}
      </div>
    </div>
  );
}
