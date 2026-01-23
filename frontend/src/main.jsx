import { CartProvider } from "./context/CartContext.jsx";
//==============================
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// 1. On importe nos nouvelles pages
import ProductsPage from "./pages/ProductsPage.jsx";
import CartPage from "./pages/Cartpage.jsx";
import Checkout from "./pages/Checkout.jsx";

// 2. On configure le routeur
const router = createBrowserRouter([
  {
    path: "/", // Le chemin de base
    element: <App />, // L'élément "parent" (qui a la Navbar)
    children: [
      {
        index: true, // La page par défaut (quand on est sur "/")
        element: <ProductsPage />,
      },
      {
        path: "/cart", // Le chemin pour le panier
        element: <CartPage />,
      },
      {
        path: "/Checkout", // Le chemin pour le panier
        element: <Checkout />,
      },
    ],
  },
]);

// 3. On "fournit" le routeur à l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
