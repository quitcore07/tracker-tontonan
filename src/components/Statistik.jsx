import { daftarKategori, daftarStatus } from "../data/tontonan";

export default function Statistik({ tontonan }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-6">Statistik Saya</h2>

      <p className="text-neutral-300 mb-8">
        Total tontonan: <span className="font-black text-red-500">{tontonan.length}</span>
      </p>

      <h3 className="text-xl font-bold mb-3">Per status</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {daftarStatus.map((s) => (
          <div key={s} className="bg-neutral-900 rounded-lg p-4 text-center border-b-4 border-red-600">
            <p className="text-3xl font-black text-red-500">
              {tontonan.filter((t) => t.status === s).length}
            </p>
            <p className="text-sm text-neutral-400">{s}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-3">Selesai per kategori</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {daftarKategori.map((k) => (
          <div key={k} className="bg-neutral-900 rounded-lg p-4 text-center">
            <p className="text-3xl font-black text-red-500">
              {tontonan.filter((t) => t.kategori === k && t.status === "Selesai").length}
            </p>
            <p className="text-sm text-neutral-400">{k}</p>
          </div>
        ))}
      </div>
    </main>
  );
}