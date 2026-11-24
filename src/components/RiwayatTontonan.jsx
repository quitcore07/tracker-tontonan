// Dulu: TodoList.jsx
// Sekarang: RiwayatTontonan.jsx
// Fungsi: daftar tontonan yang sudah selesai ditonton

import { useState } from "react";

export default function RiwayatTontonan() {
  const [input, setInput] = useState("");
  const [riwayat, setRiwayat] = useState(["Spirited Away", "Breaking Bad", "Attack on Titan"]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Riwayat Tontonan</h2>
      <p className="mb-4 text-slate-400">Daftar tontonan yang sudah selesai kamu tonton</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis judul film, series, atau anime..."
        className="px-4 py-2 rounded-lg text-white bg-gray-800 border border-gray-600 placeholder-gray-400"
      />
      <button
        onClick={() => {
          if (input.trim() !== "") {
            setRiwayat([...riwayat, input]);
            setInput("");
          }
        }}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold ml-4"
      >
        Tambah ke Riwayat
      </button>

      {riwayat.length === 0 && (
        <p className="mt-4 text-slate-500">Belum ada tontonan yang dicatat.</p>
      )}

      <ul className="mt-4">
        {riwayat.map((judul, index) => (
          <li key={index}>
            {judul}
            <button
              onClick={() => setRiwayat(riwayat.filter((_, i) => i !== index))}
              className="ml-4 text-red-400 hover:text-red-500"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}