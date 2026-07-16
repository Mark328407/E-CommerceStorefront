import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg tracking-tight">
          FIELD<span className="text-primary">STORE</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <Link to="/" className="transition-colors hover:text-foreground">
            Catalog
          </Link>
          {user && (
            <Link to="/orders" className="transition-colors hover:text-foreground">
              Orders
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative flex items-center gap-1.5 text-sm">
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="font-mono-tag absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <User size={16} />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
