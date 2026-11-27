import { useState, useEffect } from "react";
import { Link } from "react-router";
import { daftarStatus } from "../data/tontonan";

export default function Beranda({ tontonan }) {
  const [indeks, setIndeks] = useState(0);
  const jumlah = tontonan.length;
  const pilihan = tontonan[indeks % jumlah];

  useEffect(() => {
    if (jumlah < 2) return;

    const waktu = setTimeout(() => {
      setIndeks((indeks + 1) % jumlah);
    }, 4000);

    return () => clearTimeout(waktu);
  }, [indeks, jumlah]);

  return (
    <main>
      <section className="px-6 pt-14 pb-8 text-center">
        <h2 className="judul-banner text-5xl font-black mb-4">
          Semua tontonanmu, <span className="text-red-600">satu tempat.</span>
        </h2>
        <p className="text-neutral-300">
          Simpan film, series, dan anime yang ingin, sedang, atau sudah kamu tonton.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-8">
        {pilihan ? (
          <div className="rounded-xl border border-red-900 bg-gradient-to-r from-red-900 via-red-950 to-black p-8">
            <div key={pilihan.id} className="pudar min-h-40">
              <p className="text-sm text-red-300 mb-2">Pilihan dari watchlist kamu</p>
              <h3 className="text-4xl font-black mb-2">{pilihan.judul}</h3>
              <p className="text-neutral-300">
                {pilihan.kategori} • {pilihan.status} •{" "}
                {pilihan.format === "Film"
                  ? "Part " + (pilihan.part || 1)
                  : "S" + (pilihan.season || 1) + " Ep " + (pilihan.episode || 0)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/progres" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold">
                ▶ Lihat Progres
              </Link>
              <Link to="/daftar" className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded font-bold">
                Lihat Watchlist
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {tontonan.map((t, nomor) => (
                <button
                  key={t.id}
                  onClick={() => setIndeks(nomor)}
                  aria-label={"Tampilkan " + t.judul}
                  className={
                    t.id === pilihan.id
                      ? "h-2 w-8 rounded-full bg-red-500"
                      : "h-2 w-2 rounded-full bg-neutral-600 hover:bg-neutral-400"
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Link to="/tambah" className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-bold text-lg">
              + Tambah Judul Pertama
            </Link>
          </div>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 flex gap-4">
        {daftarStatus.map((s) => (
          <div key={s} className="flex-1 bg-neutral-900 rounded-lg p-5 text-center">
            <p className="text-4xl font-black text-red-500">
              {tontonan.filter((t) => t.status === s).length}
            </p>
            <p className="text-sm text-neutral-400 mt-1">{s}</p>
          </div>
        ))}
      </section>
    </main>
  );
}