import { daftarFormat } from "../data/tontonan";

const merah = "bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold";
const abu = "bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded";

export default function ProgresTontonan({ tontonan, setTontonan }) {
  function ubah(id, dataBaru) {
    setTontonan(
      tontonan.map((t) => (t.id === id ? { ...t, ...dataBaru } : t))
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-2">Progres Tontonan</h2>
      <p className="text-neutral-400 mb-6">Catat sampai mana kamu menonton</p>

      {tontonan.length === 0 && (
        <p className="text-neutral-500">
          Belum ada judul. Tambahkan dulu lewat menu + Tambah Judul.
        </p>
      )}

      {tontonan.map((t) => {
        const format = t.format || "Serial";
        const season = t.season || 1;
        const episode = t.episode || 0;
        const part = t.part || 1;

        return (
          <div key={t.id} className="bg-neutral-900 rounded-lg p-5 mb-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="font-bold text-lg">{t.judul}</p>
                <p className="text-sm text-neutral-400">
                  {t.kategori} • {t.status}
                </p>
                <select
                  value={format}
                  onChange={(e) => ubah(t.id, { format: e.target.value })}
                  className="mt-2 bg-neutral-800 rounded px-2 py-1 text-sm"
                >
                  {daftarFormat.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <p className="text-3xl font-black text-red-500">
                {format === "Serial" ? `S${season} • Ep ${episode}` : `Part ${part}`}
              </p>
            </div>

            {t.status === "Selesai" ? (
              <button onClick={() => ubah(t.id, { status: "Sedang ditonton" })} className={merah}>
                Tonton Lagi
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {format === "Serial" ? (
                  <>
                    <button onClick={() => ubah(t.id, { episode: episode + 1 })} className={merah}>
                      Episode Berikutnya
                    </button>
                    <button onClick={() => ubah(t.id, { episode: Math.max(episode - 1, 0) })} className={abu}>
                      Kurangi Ep
                    </button>
                    <button onClick={() => ubah(t.id, { season: season + 1, episode: 0 })} className={abu}>
                      Season Berikutnya
                    </button>
                    <button onClick={() => ubah(t.id, { season: Math.max(season - 1, 1) })} className={abu}>
                      Kurangi Season
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => ubah(t.id, { part: part + 1 })} className={merah}>
                      Part Berikutnya
                    </button>
                    <button onClick={() => ubah(t.id, { part: Math.max(part - 1, 1) })} className={abu}>
                      Kurangi Part
                    </button>
                  </>
                )}
                <button
                  onClick={() =>
                    ubah(t.id, format === "Serial" ? { season: 1, episode: 0 } : { part: 1 })
                  }
                  className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded"
                >
                  Reset
                </button>
                <button
                  onClick={() => ubah(t.id, { status: "Selesai" })}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded"
                >
                  Tandai Selesai
                </button>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}