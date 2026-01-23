import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

// Configuration du Toast pour les notifications
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialisation du state avec récupération du localStorage si existant
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarde dans localStorage à chaque changement du panier
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si le produit existe déjà, on incrémente seulement la quantité
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      Toast.fire({ icon: "info", title: "Quantité mise à jour ! (+1)" });
    } else {
      // Sinon, on ajoute le nouveau produit avec quantité 1
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
      Toast.fire({ icon: "success", title: "Ajouté au panier avec succès" });
    }
  };

  const removeFromCart = (productId) => {
    Toast.fire({ icon: "warning", title: "Produit retiré du panier" });
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    const itemToCheck = cartItems.find((item) => item.id === id);
    if (!itemToCheck) return;

    // Si la quantité est 1 et qu'on diminue, on supprime l'article
    if (itemToCheck.quantity === 1) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
