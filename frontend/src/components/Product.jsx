import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function Product({ product }) {
  // 1. On récupère la fonction addToCart ici
  const { addToCart } = useContext(CartContext);

  const { title, price, description, category, image } = product;

  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm flex flex-col h-full">
      <div className="flex-grow">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-t-lg mb-4"
        />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-700 font-bold mt-2">{price} $</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
        <p className="text-xs inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-4">
          {category}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
