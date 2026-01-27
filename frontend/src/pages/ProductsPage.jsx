import { useFetch } from "../../Custom_Hooks/useFetch";
import Product from "../components/Product";

// const url = import.meta.env.VITE_API_URL;
const url = "http://127.0.0.1:8000/api/products/";

function ProductsPage() {
  const { data: products, loading, error } = useFetch(url);

  if (loading) {
    return <h3 className="text-center p-4 text-lg">Loading ...</h3>;
  }

  if (error) {
    return (
      <h3 className="text-center text-red-600 p-4 text-lg">Erreur: {error}</h3>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-4">Nos Produits</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
