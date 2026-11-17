import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Beranda from "./components/Beranda";
import Body from "./components/Body";

export default function App() {
  const [halaman, setHalaman] = useState("beranda");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header setHalaman={setHalaman} />
      {halaman === "beranda" ? <Beranda setHalaman={setHalaman} /> : <Body />}
      <Footer />
    </div>
  );
}