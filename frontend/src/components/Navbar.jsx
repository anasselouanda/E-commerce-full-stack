import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  // Calcul du nombre total d'articles pour le badge
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10 sticky top-0 z-50">
      <Link to="/">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Mon <span className="text-blue-600">E-commerce</span>
        </h2>
      </Link>

      <Link to="/cart" className="relative group">
        <FaShoppingCart className="text-3xl text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />

        {/* Affichage conditionnel du badge de quantité */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md border-2 border-white animate-bounce">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
