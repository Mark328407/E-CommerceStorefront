import { useEffect, useState } from "react";
import { getActiveProducts } from "../lib/api";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getActiveProducts()
      .then((data) => {
        setProducts(data);
        setStatus("ready");
      })
      .catch((err) => {
        // The backend sends a 404 with this message when the catalog is simply empty —
        // that's not a connection failure, so don't scare the user with a network error.
        if (err instanceof Error && /no active product/i.test(err.message)) {
          setProducts([]);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      });
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="font-mono-tag mb-4 text-xs text-muted">CATALOG — {products.length.toString().padStart(2, "0")} ITEMS LIVE</p>
          <h1 className="font-display max-w-2xl text-4xl leading-tight sm:text-6xl">
            Goods, stocked and ready to ship.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            A full-stack storefront running on a live Express &amp; MongoDB inventory API —
            every product below is real data, not a mock.
          </p>
          <div className="mt-8 max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalog…"
              className="w-full border-b border-border bg-transparent py-2 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </div>
        </div>
      </section>

      {status === "loading" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">Loading catalog…</p>
      )}

      {status === "error" && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">
          Couldn't reach the API. The backend may be waking up from sleep (Render free tier) —
          try refreshing in a few seconds.
        </p>
      )}

      {status === "ready" && filtered.length === 0 && products.length === 0 && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">
          No products in the catalog yet. Add some via <code>POST /products</code> as an admin user.
        </p>
      )}

      {status === "ready" && filtered.length === 0 && products.length > 0 && (
        <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-muted">No products match "{query}".</p>
      )}

      {status === "ready" && filtered.length > 0 && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
