import { useState } from "react";
import { daftarKategori, daftarStatus } from "../data/tontonan";

export default function Daftar({ tontonan, setTontonan }) {
  const [kategori, setKategori] = useState("Semua");
  const [idKonfirmasi, setIdKonfirmasi] = useState(null);

  const tampil =
    kategori === "Semua"
      ? tontonan
      : tontonan.filter((t) => t.kategori === kategori);

  function hapus(id) {
    setTontonan(tontonan.filter((t) => t.id !== id));
    setIdKonfirmasi(null);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-6">Watchlist</h2>

      <div className="flex flex-wrap gap-2 mb-10">
        {["Semua", ...daftarKategori].map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={
              kategori === k
                ? "bg-red-600 px-4 py-1 rounded-full font-semibold"
                : "bg-neutral-800 hover:bg-neutral-700 px-4 py-1 rounded-full"
            }
          >
            {k}
          </button>
        ))}
      </div>

      {daftarStatus.map((s) => {
        const isi = tampil.filter((t) => t.status === s);
        return (
          <section key={s} className="mb-10">
            <h3 className="text-xl font-bold mb-4">{s}</h3>
            {isi.length === 0 && <p className="text-neutral-500">Belum ada.</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {isi.map((t) => (
                <div
                  key={t.id}
                  className="bg-neutral-900 rounded-lg p-4 min-h-40 flex flex-col justify-between border-b-4 border-red-600"
                >
                  <div>
                    <span className="text-xs bg-neutral-800 px-2 py-1 rounded">
                      {t.kategori}
                    </span>
                    <p className="font-bold text-lg mt-3">{t.judul}</p>
                  </div>
                  <div>
                    {t.episode > 0 && t.status !== "Selesai" && (
                      <p className="text-sm text-neutral-300">Episode {t.episode}</p>
                    )}
                    {t.rating > 0 && <p className="text-yellow-400">★ {t.rating}/5</p>}
                    {t.catatan && <p className="text-sm text-neutral-400 mt-1">{t.catatan}</p>}

                    {idKonfirmasi === t.id ? (
                      <div className="flex items-center gap-2 mt-3 text-sm">
                        <span>Yakin?</span>
                        <button
                          onClick={() => hapus(t.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
                        >
                          Ya
                        </button>
                        <button
                          onClick={() => setIdKonfirmasi(null)}
                          className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 rounded"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIdKonfirmasi(t.id)}
                        className="mt-3 text-sm text-red-500 hover:text-red-400"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}