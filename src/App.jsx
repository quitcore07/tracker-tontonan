import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Beranda from "./components/Beranda";
import Watchlist from "./components/Watchlist";
import TambahJudul from "./components/TambahJudul";
import ProgresTontonan from "./components/ProgresTontonan";
import SudahDitonton from "./components/SudahDitonton";
import CariTontonan from "./components/CariTontonan";
import StatistikSaya from "./components/StatistikSaya";
import CaraPakai from "./components/CaraPakai";
import { dataAwal } from "./data/tontonan";

const aktif = "px-3 py-1 rounded font-bold text-white bg-red-600";
const biasa = "px-3 py-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800";

function kelas({ isActive }) {
  return isActive ? aktif : biasa;
}

function ambilData() {
  const simpanan = localStorage.getItem("tontonan");
  return simpanan ? JSON.parse(simpanan) : dataAwal;
}

function TeksBerjalan({ tontonan }) {
  if (tontonan.length === 0) return null;

  const durasi = Math.max(20, tontonan.length * 4) + "s";

  return (
    <div className="overflow-hidden bg-red-700 py-1 text-sm font-semibold">
      <div className="jalur" style={{ animationDuration: durasi }}>
        {[1, 2].map((salinan) => (
          <div key={salinan} className="grup" aria-hidden={salinan === 2}>
            {tontonan.map((t) => (
              <span key={t.id} className="px-6 whitespace-nowrap">
                ▶ {t.judul} • {t.status}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tontonan, setTontonan] = useState(ambilData);
  const lokasi = useLocation();

  useEffect(() => {
    localStorage.setItem("tontonan", JSON.stringify(tontonan));
  }, [tontonan]);

  return (
    <div className="latar min-h-screen flex flex-col text-white">
      <div className="sticky top-0 z-10 bg-black border-b-2 border-red-700">
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
        <TeksBerjalan tontonan={tontonan} />
      </div>

      <div key={lokasi.pathname} className="halaman flex-1">
        <Routes>
          <Route path="/" element={<Beranda tontonan={tontonan} />} />
          <Route path="/daftar" element={<Watchlist tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/tambah" element={<TambahJudul tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/progres" element={<ProgresTontonan tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/riwayat" element={<SudahDitonton tontonan={tontonan} setTontonan={setTontonan} />} />
          <Route path="/rekomendasi" element={<CariTontonan />} />
          <Route path="/statistik" element={<StatistikSaya tontonan={tontonan} />} />
          <Route path="/tentang" element={<CaraPakai />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}