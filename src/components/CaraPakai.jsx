export default function Tentang() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-6">Cara Pakai</h2>

      <h3 className="text-xl font-bold mb-2 text-red-500">Apa ini?</h3>
      <p className="text-neutral-300 mb-6">
        Tracker Tontonan adalah website watchlist pribadi untuk mencatat film,
        series, anime, dan kartun yang ingin, sedang, atau sudah kamu tonton.
      </p>

      <h3 className="text-xl font-bold mb-2 text-red-500">Cara pakai</h3>
      <ol className="list-decimal list-inside text-neutral-300 mb-6 space-y-1">
        <li>Tambahkan judul baru lewat menu + Tambah Judul.</li>
        <li>Pantau tontonanmu di Watchlist dan catat posisi terakhir di Progres Tontonan.</li>
        <li>Lihat ringkasan angkanya di Statistik Saya.</li>
      </ol>

      <h3 className="text-xl font-bold mb-2 text-red-500">Dibuat oleh</h3>
      <p className="text-neutral-300">
        Ubay Abdillah, untuk mata kuliah Web Application Development.
      </p>
    </main>
  );
}