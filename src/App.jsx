import { useState } from "react";
import { Routes, Route, Link } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Beranda from "./components/Beranda";
import Body from "./components/Body";
import ProgresEpisode from "./components/ProgresEpisode";
import RiwayatTontonan from "./components/RiwayatTontonan";
import Rekomendasi from "./components/Rekomendasi";

export default function App() {
  const [halaman, setHalaman] = useState("beranda");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header setHalaman={setHalaman} />

      <nav className="flex gap-4 p-4">
        <Link to="/">Beranda</Link>
        <Link to="/progres">Progres Episode</Link>
        <Link to="/riwayat">Riwayat Tontonan</Link>
        <Link to="/rekomendasi">Rekomendasi</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            halaman === "beranda" ? (
              <Beranda setHalaman={setHalaman} />
            ) : (
              <Body />
            )
          }
        />
        <Route path="/progres" element={<ProgresEpisode />} />
        <Route path="/riwayat" element={<RiwayatTontonan />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
      </Routes>

      <Footer />
    </div>
  );
}