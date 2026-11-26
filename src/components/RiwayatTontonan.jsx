import { useState } from "react";

export default function RiwayatTontonan({ tontonan, setTontonan }) {
  const [idKonfirmasi, setIdKonfirmasi] = useState(null);
  const [konfirmasiSemua, setKonfirmasiSemua] = useState(false);
  const [ketikan, setKetikan] = useState("");

  const riwayat = tontonan.filter((t) => t.status === "Selesai");

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

      {riwayat.map((t) => (
        <div
          key={t.id}
          className="bg-neutral-900 rounded-lg p-4 mb-3 flex items-center justify-between"
        >
          <div>
            <p className="font-bold">{t.judul}</p>
            <p className="text-sm text-neutral-400">
              {t.kategori}
              {t.rating > 0 && " • ★ " + t.rating + "/5"}
            </p>
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
            <button
              onClick={() => setIdKonfirmasi(t.id)}
              className="text-sm text-red-500 hover:text-red-400"
            >
              Hapus
            </button>
          )}
        </div>
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