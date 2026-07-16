import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMyOrders } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function Orders() {
  const { user } = useAuth();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!user) return;
    getMyOrders()
      .then(({ orders }) => {
        setOrders(orders);
        setStatus(orders.length ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-muted">Sign in to view your order history.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl">Order history</h1>

      {justPlaced && (
        <p className="mt-4 border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
          Order placed successfully.
        </p>
      )}

      {status === "loading" && <p className="mt-6 text-sm text-muted">Loading orders…</p>}
      {status === "error" && <p className="mt-6 text-sm text-muted">Couldn't load orders.</p>}
      {status === "empty" && <p className="mt-6 text-sm text-muted">No orders placed yet.</p>}

      {status === "ready" && (
        <div className="mt-8 divide-y divide-border border-y border-border">
          {orders.map((order) => (
            <div key={order._id} className="py-5">
              <div className="flex items-center justify-between">
                <p className="font-mono-tag text-xs text-muted">
                  {new Date(order.orderedOn).toLocaleDateString()} · #{order._id.slice(-6)}
                </p>
                <span className="font-mono-tag text-xs uppercase text-primary">{order.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {order.productsOrdered.length} item{order.productsOrdered.length !== 1 ? "s" : ""}
              </p>
              <p className="font-mono-tag mt-1 text-sm">{formatPrice(order.totalPrice)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
