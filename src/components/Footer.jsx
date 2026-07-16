import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-display text-lg tracking-tight">
              FIELD<span className="text-primary">STORE</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              A full-stack MERN storefront — real inventory, real auth, real orders,
              running on a live Express &amp; MongoDB API.
            </p>
          </div>

          <div>
            <p className="font-mono-tag text-xs text-muted">SHOP</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted transition-colors hover:text-foreground">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted transition-colors hover:text-foreground">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted transition-colors hover:text-foreground">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tag text-xs text-muted">DEVELOPER</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://my-portfolio-cilr.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mark328407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                >
                  <Github size={14} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                >
                  <Mail size={14} /> Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Mark Anthony Estrecho. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-border px-2 py-1 font-mono-tag">React</span>
            <span className="rounded-md border border-border px-2 py-1 font-mono-tag">Express</span>
            <span className="rounded-md border border-border px-2 py-1 font-mono-tag">MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
