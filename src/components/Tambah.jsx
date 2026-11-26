import { useState } from "react";
import { daftarKategori, daftarStatus } from "../data/tontonan";

export default function Tambah({ tontonan, setTontonan }) {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(daftarKategori[0]);
  const [status, setStatus] = useState(daftarStatus[0]);
  const [catatan, setCatatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function simpan() {
    if (judul === "") return;

    const itemBaru = {
      id: tontonan.length === 0 ? 1 : tontonan[tontonan.length - 1].id + 1,
      judul: judul,
      kategori: kategori,
      status: status,
      episode: 0,
      rating: 0,
      tanggal: "",
      catatan: catatan,
    };

    setTontonan([...tontonan, itemBaru]);
    setJudul("");
    setCatatan("");
    setBerhasil(true);
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-6">Tambah Judul</h2>

      <div className="flex flex-col gap-4">
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul"
          className="bg-neutral-900 border border-neutral-800 rounded px-4 py-2"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded px-4 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded px-4 py-2"
        >
          {daftarStatus.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Catatan (opsional)"
          className="bg-neutral-900 border border-neutral-800 rounded px-4 py-2"
        />

        <button
          onClick={simpan}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold"
        >
          Simpan
        </button>

        {berhasil && <p className="text-green-400 text-center">Tontonan berhasil ditambahkan.</p>}
      </div>
    </main>
  );
}