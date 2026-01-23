import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Mettre TOUT le code qui peut échouer dans le 'try'
        const response = await fetch(url);
        //  Gérer une mauvaise réponse (ex: 404, 500)
        // Si la réponse n'est pas 'ok', on crée une erreur
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const data = await response.json();
        // Mettre à jour l'état avec les produits (c'était manquant)
        setData(data);
        console.log(data);
      } catch (error) {
        // En cas d'erreur (réseau ou 'throw'), la stocker.
        // Ne pas utiliser 'throw' ici, mais 'setError'.
        setError(error.message);
      } finally {
        // Dans tous les cas (succès ou échec), arrêter le chargement.
        setLoading(false);
      }
    };
    fetchProducts();
  }, [url]);

  return { data, loading, error };
};
