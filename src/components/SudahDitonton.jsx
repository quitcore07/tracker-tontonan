import { useState } from "react";
import { daftarKategori } from "../data/tontonan";

export default function SudahDitonton({ tontonan, setTontonan }) {
  const [idKonfirmasi, setIdKonfirmasi] = useState(null);
  const [konfirmasiSemua, setKonfirmasiSemua] = useState(false);
  const [ketikan, setKetikan] = useState("");
  const [filter, setFilter] = useState("Semua");

  const riwayat = tontonan.filter((t) => t.status === "Selesai");
  const kategoriTampil = daftarKategori.filter(
    (k) =>
      (filter === "Semua" || filter === k) &&
      riwayat.some((t) => t.kategori === k)
  );

  function tontonLagi(id) {
    setTontonan(
      tontonan.map((t) =>
        t.id === id ? { ...t, status: "Sedang ditonton" } : t
      )
    );
    setIdKonfirmasi(null);
  }

  function beriRating(id, nilai) {
    setTontonan(
      tontonan.map((t) => (t.id === id ? { ...t, rating: nilai } : t))
    );
  }

  function hapus(id) {
    setTontonan(tontonan.filter((t) => t.id !== id));
    setIdKonfirmasi(null);
  }

  function hapusSemua() {
    setTontonan(tontonan.filter((t) => t.status !== "Selesai"));
    setKonfirmasiSemua(false);
    setKetikan("");
  }

  function batalHapusSemua() {
    setKonfirmasiSemua(false);
    setKetikan("");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-2">Sudah Ditonton</h2>
      <p className="text-neutral-400 mb-6">Daftar tontonan yang sudah selesai kamu tonton</p>

      {riwayat.length === 0 && <p className="text-neutral-500">Belum ada riwayat.</p>}

      {riwayat.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {["Semua", ...daftarKategori].map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={
                filter === k
                  ? "bg-red-600 px-3 py-1 rounded text-sm font-bold"
                  : "bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded text-sm text-neutral-300"
              }
            >
              {k} (
              {k === "Semua"
                ? riwayat.length
                : riwayat.filter((t) => t.kategori === k).length}
              )
            </button>
          ))}
        </div>
      )}

      {riwayat.length > 0 && kategoriTampil.length === 0 && (
        <p className="text-neutral-500">Belum ada judul di kategori ini.</p>
      )}

      {kategoriTampil.map((k) => (
        <section key={k} className="mb-8">
          <h3 className="text-lg font-bold text-red-500 mb-2">{k}</h3>
          <ol className="bg-neutral-900 rounded-lg divide-y divide-neutral-800">
            {riwayat
              .filter((t) => t.kategori === k)
              .map((t, nomor) => (
                <li
                  key={t.id}
                  className="p-4 flex flex-wrap items-center gap-4"
                >
                  <span className="w-6 text-neutral-500">{nomor + 1}.</span>
                  <div className="flex-1">
                    <p className="font-bold">{t.judul}</p>
                    <p className="text-sm text-neutral-400">
                      {t.format === "Film"
                        ? "Film • Part " + (t.part || 1)
                        : "Serial • Season " + (t.season || 1) + " • Ep " + (t.episode || 0)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => beriRating(t.id, n)}
                          aria-label={"Beri rating " + n}
                          className={
                            n <= (t.rating || 0)
                              ? "text-xl text-yellow-400"
                              : "text-xl text-neutral-600 hover:text-yellow-400"
                          }
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-neutral-400">
                        {t.rating > 0 ? t.rating + "/5" : "Belum dinilai"}
                      </span>
                    </div>
                  </div>

                  {idKonfirmasi === t.id ? (
                    <div className="flex items-center gap-2 text-sm">
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
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={() => tontonLagi(t.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
                      >
                        Tonton Lagi
                      </button>
                      <button
                        onClick={() => setIdKonfirmasi(t.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ol>
        </section>
      ))}

      {riwayat.length > 0 && (
        <div className="mt-16 pt-6 border-t border-neutral-800">
          {konfirmasiSemua ? (
            <div className="border border-red-600 rounded-lg p-4">
              <p className="font-bold text-red-500 mb-1">Peringatan</p>
              <p className="text-sm text-neutral-300 mb-3">
                {riwayat.length} judul akan dihapus permanen dan tidak bisa dibatalkan.
                Ketik <span className="font-bold text-white">HAPUS</span> untuk melanjutkan.
              </p>
              <input
                value={ketikan}
                onChange={(e) => setKetikan(e.target.value)}
                placeholder="Ketik HAPUS"
                className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 mb-3 w-full"
              />
              <div className="flex gap-2">
                <button
                  onClick={hapusSemua}
                  disabled={ketikan !== "HAPUS"}
                  className={
                    ketikan === "HAPUS"
                      ? "bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                      : "bg-neutral-800 text-neutral-500 px-4 py-2 rounded cursor-not-allowed"
                  }
                >
                  Hapus semua riwayat
                </button>
                <button
                  onClick={batalHapusSemua}
                  className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setKonfirmasiSemua(true)}
              className="text-xs text-neutral-500 hover:text-neutral-300"
            >
              Hapus semua riwayat...
            </button>
          )}
        </div>
      )}
    </main>
  );
}