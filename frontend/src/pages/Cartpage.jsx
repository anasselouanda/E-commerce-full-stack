import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";

function CartPage() {
  const { cartItems } = useContext(CartContext);

  //  On initialise le hook ici (au niveau supérieur du composant)
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">Mon Panier</h1>

      {cartItems.length === 0 ? (
        <Link
          to="/"
          className="flex flex-col items-center justify-center p-10 mx-auto w-full max-w-lg bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition cursor-pointer"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">
            Le panier est vide
          </h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors">
            Retour aux achats
          </button>
        </Link>
      ) : (
        <div className="space-y-4">
          {/* Liste des produits avec le composant CheckoutItem */}
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}

          {/* Section Total et Checkout */}
          <div className="flex justify-center md:justify-end pt-6">
            <div className="w-full md:max-w-sm bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-800">
                  Total à payer :
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-blue-600">
                  {totalPrice.toFixed(2)} $
                </span>
              </div>
              <button
                onClick={handleCheckOut}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md"
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
