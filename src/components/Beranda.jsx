export default function Beranda({ setHalaman }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Catat semua tontonanmu di satu tempat</h2>
      <p className="text-slate-300 mb-8">
        Simpan film, series, dan anime yang ingin, sedang, atau sudah kamu tonton.
      </p>
      <button
        onClick={() => setHalaman("daftar")}
        className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
      >
        Lihat Daftar Tontonan
      </button>
    </main>
  );
}