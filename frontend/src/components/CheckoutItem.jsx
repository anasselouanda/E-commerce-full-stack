import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function CheckoutItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { id, image, title, price, category, quantity } = item;
  const itemTotal = price * quantity;

  return (
    <div
      key={id}
      className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 gap-4 md:gap-6"
    >
      {/* Image Produit */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain rounded-md border p-1 shrink-0"
      />

      {/* Détails Produit */}
      <div className="flex-1 text-center md:text-left w-full">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {category}
        </p>
        <p className="text-blue-600 font-semibold mt-1">{price} $ / unité</p>
      </div>

      {/* Actions : Quantité, Prix Total, Suppression */}
      <div className="flex flex-row items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 mt-4 md:mt-0">
        {/* Contrôles Quantité */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-md transition-all shadow-sm"
            title="Diminuer"
          >
            <FaMinus size={12} />
          </button>

          <span className="text-sm font-bold text-gray-900 w-8 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-white rounded-md transition-all shadow-sm"
            title="Augmenter"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* Prix Total Ligne */}
        <div className="text-right">
          <p className="font-bold text-blue-700 text-lg whitespace-nowrap">
            {itemTotal.toFixed(2)} $
          </p>
        </div>

        {/* Bouton Supprimer */}
        <div>
          <button
            onClick={() => removeFromCart(id)}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all duration-300 hover:shadow-md outline-none hover:rotate-[360deg]"
            title="Supprimer"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
