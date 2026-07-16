# Fieldstore — E-Commerce Storefront

A full-stack MERN e-commerce storefront frontend, built with React, Vite, TypeScript, and Tailwind CSS. Consumes a live Express + MongoDB REST API for products, cart, auth, and orders.

**Live demo:** [https://e-commerce-storefront-eight.vercel.app/](https://e-commerce-storefront-eight.vercel.app/)

## Features

- **Catalog** — browse and search active products from the live API
- **Product detail** — view description, price, and add to cart with quantity control
- **Cart** — update quantities, remove items, view running total
- **Auth** — register and sign in against the backend's JWT-based auth
- **Checkout** — convert cart into an order
- **Order history** — view past orders and status

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS 4, React Router
- **Backend:** E-Commerce Storefront API — Express, MongoDB/Mongoose, JWT auth, deployed on Render at `https://e-commerce-storefront-gsgs.onrender.com`

## Getting Started

```bash
git clone <this-repo-url>
cd ecommerce-storefront
npm install
npm run dev
```

By default the app talks to the live backend on Render. To point at a local backend instead, copy `.env.example` to `.env` and set:

```
VITE_API_BASE_URL=http://localhost:4000
```

### Build

```bash
npm run build
npm run preview
```

## Deployment

Deployed on Vercel. Build command: `npm run build`, output directory: `dist`.

## Author

**Mark Anthony Estrecho** — [Portfolio](https://my-portfolio-cilr.vercel.app/) · [GitHub](https://github.com/Mark328407)
