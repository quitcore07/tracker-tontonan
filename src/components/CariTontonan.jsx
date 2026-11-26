// Dulu: FetchData.jsx
// Sekarang: Rekomendasi.jsx
// Fungsi: ambil rekomendasi tontonan rating tertinggi per kategori
// (Jikan API untuk anime, TMDB API untuk kategori lainnya)
import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_TMDB_KEY;
const EROPA = "with_origin_country=GB%7CFR%7CDE%7CES%7CIT%7CSE%7CDK%7CNO";
const ANIMASI = "with_genres=16";
const BUKAN_ANIMASI = "without_genres=16";

// Membuat alamat TMDB: jenis = "movie" atau "tv"
const tmdb = (jenis, filter, minVote = 100) =>
  `https://api.themoviedb.org/3/discover/${jenis}?api_key=${KEY}&sort_by=vote_average.desc&vote_count.gte=${minVote}&${filter}`;

// Film + drama dari satu negara (lewat bahasa asli), tanpa animasi
// supaya anime dan donghua tidak ikut masuk
const filmDanDrama = (bahasa, minVote = 100) => [
  tmdb("movie", `with_original_language=${bahasa}&${BUKAN_ANIMASI}`, minVote),
  tmdb("tv", `with_original_language=${bahasa}&${BUKAN_ANIMASI}`, minVote),
];

const KATEGORI = {
  Eropa: [tmdb("movie", EROPA), tmdb("tv", EROPA)],
  Asia: {
    Indonesia: filmDanDrama("id", 30),
    Korea: filmDanDrama("ko"),
    Jepang: filmDanDrama("ja"),
    Thailand: filmDanDrama("th", 30),
    China: filmDanDrama("zh"),
  },
  Anime: ["https://api.jikan.moe/v4/top/anime?limit=10"],
  Kartun: [
    tmdb("tv", `${ANIMASI}&with_original_language=en`),
    tmdb("movie", `${ANIMASI}&with_original_language=en`),
  ],
  Donghua: [tmdb("tv", `${ANIMASI}&with_original_language=zh`, 30)],
};

// Jikan dan TMDB bentuk datanya beda, jadi disamakan: { judul, rating }
const rapikan = (hasil) =>
  (hasil.data ?? hasil.results).map((item) => ({
    judul: item.title ?? item.name,
    rating: item.score ?? item.vote_average,
  }));

export default function Rekomendasi() {
  const [kategori, setKategori] = useState("Eropa");
  const [negara, setNegara] = useState("Indonesia");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asia punya pilihan negara, kategori lain langsung berupa daftar alamat
    const urls =
      kategori === "Asia" ? KATEGORI.Asia[negara] : KATEGORI[kategori];

    setLoading(true);
    setError(null);

    if (kategori !== "Anime" && !KEY) {
      setError("API key TMDB belum diisi di file .env");
      setLoading(false);
      return;
    }

    Promise.all(
      urls.map((url) =>
        fetch(url).then((res) => {
          if (!res.ok) throw new Error("Gagal");
          return res.json();
        })
      )
    )
      .then((hasil) => {
        const gabung = hasil
          .flatMap(rapikan)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);
        setData(gabung);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data rekomendasi");
        setLoading(false);
      });
  }, [kategori, negara]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Rekomendasi Tontonan</h2>

      {/* Pilihan kategori utama */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {Object.keys(KATEGORI).map((nama) => (
          <button
            key={nama}
            onClick={() => setKategori(nama)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              kategori === nama
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {nama}
          </button>
        ))}
      </div>

      {/* Pilihan negara, hanya muncul kalau Asia dipilih */}
      {kategori === "Asia" && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.keys(KATEGORI.Asia).map((nama) => (
            <button
              key={nama}
              onClick={() => setNegara(nama)}
              className={`px-3 py-1 rounded-full text-sm ${
                negara === nama
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {nama}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <ul className="mt-3">
          {data.map((item, index) => (
            <li key={item.judul + index}>
              {index + 1}. {item.judul} (⭐ {Number(item.rating).toFixed(1)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}