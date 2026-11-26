import { useState } from "react";
import { Routes, Route, NavLink } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Beranda from "./components/Beranda";
import Daftar from "./components/Daftar";
import Tambah from "./components/Tambah";
import ProgresEpisode from "./components/ProgresEpisode";
import RiwayatTontonan from "./components/RiwayatTontonan";
import Rekomendasi from "./components/Rekomendasi";
import Statistik from "./components/Statistik";
import Tentang from "./components/Tentang";
import { dataAwal } from "./data/tontonan";

const aktif = "px-3 py-1 rounded font-bold text-white bg-red-600";
const biasa = "px-3 py-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800";

function kelas({ isActive }) {
  return isActive ? aktif : biasa;
}

export default function App() {
  const [tontonan, setTontonan] = useState(dataAwal);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <div className="sticky top-0 z-10 bg-black border-b border-neutral-800">
        <Header />
        <nav className="flex flex-wrap gap-1 px-4 py-3">
          <NavLink to="/" end className={kelas}>Beranda</NavLink>
          <NavLink to="/daftar" className={kelas}>Watchlist</NavLink>
          <NavLink to="/tambah" className={kelas}>+ Tambah Judul</NavLink>
          <NavLink to="/progres" className={kelas}>Progres Tontonan</NavLink>
          <NavLink to="/riwayat" className={kelas}>Sudah Ditonton</NavLink>
          <NavLink to="/rekomendasi" className={kelas}>Cari Tontonan</NavLink>
          <NavLink to="/statistik" className={kelas}>Statistik Saya</NavLink>
          <NavLink to="/tentang" className={kelas}>Cara Pakai</NavLink>
        </nav>
      </div>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Beranda tontonan={tontonan} />} />
          <Route path="/daftar" element={<Daftar tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/tambah" element={<Tambah tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/progres" element={<ProgresEpisode tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/riwayat" element={<RiwayatTontonan tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/rekomendasi" element={<Rekomendasi />} />
          <Route path="/statistik" element={<Statistik tontonan={tontonan} />} />
          <Route path="/tentang" element={<Tentang />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}