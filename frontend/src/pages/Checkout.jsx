import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    adresse: "",
  });

  // Calcul du total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Commande validée !",
      text: `Merci ${formData.nom}, votre commande de ${totalPrice.toFixed(
        2,
      )}$ a été reçue.`,
      icon: "success",
      confirmButtonColor: "#10B981",
    }).then(() => {
      clearCart();
      navigate("/");
    });
  };

  // Si le panier est vide
  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2>Votre panier est vide.</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Finaliser la commande
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* COLONNE GAUCHE : Formulaire */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Informations de livraison
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="nom"
                required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Adresse</label>
              <textarea
                name="adresse"
                required
                rows="3"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded mt-4 transition"
            >
              Payer {totalPrice.toFixed(2)} $
            </button>
          </form>
        </div>

        {/* COLONNE DROITE : Résumé de la commande  */}
        <div className="lg:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg border sticky top-24">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">
              Résumé de la commande
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0"
                >
                  {/* Image avec Badge de quantité */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-md border border-gray-200 bg-white p-1"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {item.quantity}
                    </span>
                  </div>

                  {/* Infos Produit */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {item.category}
                    </p>
                  </div>

                  {/* Prix */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} $
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totaux */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{totalPrice.toFixed(2)} $</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Livraison</span>
                <span className="text-green-600 font-medium">Gratuit</span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">USD</span>
                  <span className="text-2xl font-extrabold text-blue-600">
                    {totalPrice.toFixed(2)} $
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
