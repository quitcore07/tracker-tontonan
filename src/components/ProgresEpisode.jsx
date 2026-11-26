export default function ProgresEpisode({ tontonan, setTontonan }) {
  const sedang = tontonan.filter((t) => t.status === "Sedang ditonton");

  function ubahEpisode(id, angka) {
    setTontonan(
      tontonan.map((t) =>
        t.id === id
          ? { ...t, episode: t.episode + angka < 0 ? 0 : t.episode + angka }
          : t
      )
    );
  }

  function resetEpisode(id) {
    setTontonan(tontonan.map((t) => (t.id === id ? { ...t, episode: 0 } : t)));
  }

  function tandaiSelesai(id) {
    setTontonan(
      tontonan.map((t) => (t.id === id ? { ...t, status: "Selesai" } : t))
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-2">Progres Tontonan</h2>
      <p className="text-neutral-400 mb-6">Catat sampai mana kamu menonton</p>

      {sedang.length === 0 && (
        <p className="text-neutral-500">
          Belum ada yang sedang ditonton. Tambahkan judul dengan status Sedang ditonton.
        </p>
      )}

      {sedang.map((t) => (
        <div key={t.id} className="bg-neutral-900 rounded-lg p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-lg">{t.judul}</p>
              <p className="text-sm text-neutral-400">{t.kategori}</p>
            </div>
            <p className="text-3xl font-black text-red-500">Ep {t.episode}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => ubahEpisode(t.id, 1)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
            >
              Episode Berikutnya
            </button>
            <button
              onClick={() => ubahEpisode(t.id, -1)}
              className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded"
            >
              Kurangi
            </button>
            <button
              onClick={() => resetEpisode(t.id)}
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded"
            >
              Reset
            </button>
            <button
              onClick={() => tandaiSelesai(t.id)}
              className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded"
            >
              Tandai Selesai
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}