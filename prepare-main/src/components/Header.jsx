import { Home, Info, Contact, CircleUserRound} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { KrjContext } from "../App";

export default function Header() {
  const { keranjang } = useContext(KrjContext);

  return (
    <header className="w-full flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg px-6 py-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Zickets</h1>
      </div>
      <nav className="flex">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2 text-white cursor-pointer hover:text-yellow-300 transition duration-300">
            <Home />
            <Link to="/" className="text-lg">Home</Link>
          </li>
          <li className="flex items-center gap-2 text-white cursor-pointer hover:text-yellow-300 transition duration-300">
            <CircleUserRound />
            <Link to="/login" className="text-lg">Login</Link>
          </li>
          <li className="flex items-center gap-2 text-white cursor-pointer hover:text-yellow-300 transition duration-300">
            <Contact />
            <Link to="/contact" className="text-lg">Contact</Link>
          </li>
          <li className="flex items-center gap-2 text-white cursor-pointer hover:text-yellow-300 transition duration-300">
            <Info />
            <Link to="/about" className="text-lg">About</Link>
          </li>
          

          
         
        </ul>
      </nav>
    </header>
  );
}
