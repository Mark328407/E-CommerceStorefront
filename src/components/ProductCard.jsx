import { Link } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product, index }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group flex flex-col border-b border-r border-border p-6 transition-colors hover:bg-card"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono-tag text-xs text-muted">
          SKU-{String(index + 1).padStart(3, "0")}
        </span>
        <span className="h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mb-6 flex aspect-square items-center justify-center overflow-hidden bg-background">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-4xl text-muted/30">
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="font-display text-base leading-snug">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
      <p className="font-mono-tag mt-4 text-sm text-primary">{formatPrice(product.price)}</p>
    </Link>
  );
}
