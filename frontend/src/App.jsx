import { Outlet } from "react-router-dom"; // Importe le "trou" pour les pages
import Navbar from "./components/Navbar"; // <-- Importe VOTRE Navbar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar /> {/* <-- Votre Navbar est affichée ici */}
      <ToastContainer />
      <main className="flex-grow p-4">
        <Outlet /> {/* <-- Le "trou" où vos pages vont s'afficher */}
      </main>
      {/* On pourrait ajouter un Footer.jsx ici plus tard */}
    </div>
  );
}

export default App;
