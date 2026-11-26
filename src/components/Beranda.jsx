import { Link } from "react-router";
import { daftarStatus } from "../data/tontonan";

export default function Beranda({ tontonan }) {
  return (
    <main>
      <section className="px-6 py-24 text-center bg-gradient-to-b from-red-950/60 via-neutral-950 to-neutral-950">
        <h2 className="text-5xl font-black mb-4">
          Semua tontonanmu, <span className="text-red-600">satu tempat.</span>
        </h2>
        <p className="text-neutral-300 mb-8">
          Simpan film, series, dan anime yang ingin, sedang, atau sudah kamu tonton.
        </p>
        <Link
          to="/daftar"
          className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-bold text-lg"
        >
          ▶ Lihat Watchlist
        </Link>
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