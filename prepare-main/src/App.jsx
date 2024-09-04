import { createContext, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export const KrjContext = createContext();

export default function App() {
  const [keranjang, setKeranjang] = useState([]);

  return (
    <KrjContext.Provider value={{ keranjang, setKeranjang }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </KrjContext.Provider>
  );
}
