import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-display text-3xl">Create account</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted">First name</label>
            <input
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-muted">Last name</label>
            <input
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted">Mobile number (11 digits)</label>
          <input
            required
            pattern="\d{11}"
            title="Mobile number must be exactly 11 digits"
            value={form.mobileNo}
            onChange={(e) => update("mobileNo", e.target.value)}
            className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted">Password (min. 8 characters)</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
