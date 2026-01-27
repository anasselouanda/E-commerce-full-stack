// import { useContext } from "react";
// import CartContext from "../context/CartContext";

// export default function Product({ product }) {
//   // 1. On récupère la fonction addToCart ici
//   const { addToCart } = useContext(CartContext);

//   const { title, price, description, category, image } = product;

//   return (
//     <div className="bg-white border p-4 rounded-lg shadow-sm flex flex-col h-full">
//       <div className="flex-grow">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-48 object-contain rounded-t-lg mb-4"
//         />
//         <h2 className="text-lg font-semibold">{title}</h2>
//         <p className="text-gray-700 font-bold mt-2">{price} $</p>
//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
//         <p className="text-xs inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-4">
//           {category}
//         </p>
//       </div>

//       <button
//         onClick={() => addToCart(product)}
//         className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
//       >
//         Ajouter au panier
//       </button>
//     </div>
//   );
// }
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function Product({ product }) {
  // 1. On récupère la fonction addToCart ici
  const { addToCart } = useContext(CartContext);

  // 👇 LA MODIFICATION EST ICI
  // On récupère 'name' (Django) et on le renomme 'title' pour que ton HTML en bas fonctionne.
  // On gère aussi le cas où 'category' serait un objet ou un ID.
  const { name: title, price, description, category, image } = product;

  // Petite sécurité pour la catégorie (si Django envoie un ID ou un Objet au lieu d'un texte)
  const categoryDisplay =
    typeof category === "object" ? category.name : category;

  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm flex flex-col h-full">
      <div className="flex-grow">
        <img
          src={image} // Django envoie l'URL complète normalement
          alt={title}
          className="w-full h-48 object-contain rounded-t-lg mb-4"
        />
        {/* Ici, 'title' contient en fait le 'name' de Django */}
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-700 font-bold mt-2">{price} $</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
        <p className="text-xs inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-4">
          {categoryDisplay}
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
