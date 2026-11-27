import { useState } from "react";
import { daftarKategori, daftarStatus, daftarFormat } from "../data/tontonan";

const gaya = "bg-neutral-900 border border-neutral-800 rounded px-4 py-2";

export default function Tambah({ tontonan, setTontonan }) {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(daftarKategori[0]);
  const [format, setFormat] = useState(daftarFormat[0]);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(0);
  const [part, setPart] = useState(1);
  const [status, setStatus] = useState(daftarStatus[0]);
  const [catatan, setCatatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  const belumNonton = format === "Serial" && Number(episode) < 1;
  const statusDipakai =
    belumNonton && status === "Selesai" ? daftarStatus[0] : status;

  function simpan() {
    if (judul === "") return;

    const itemBaru = {
      id: tontonan.length === 0 ? 1 : tontonan[tontonan.length - 1].id + 1,
      judul: judul,
      kategori: kategori,
      format: format,
      status: statusDipakai,
      season: Math.max(Number(season), 1),
      episode: Math.max(Number(episode), 0),
      part: Math.max(Number(part), 1),
      rating: 0,
      tanggal: "",
      catatan: catatan,
    };

    setTontonan([...tontonan, itemBaru]);
    setJudul("");
    setCatatan("");
    setSeason(1);
    setEpisode(0);
    setPart(1);
    setBerhasil(true);
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black mb-6">Tambah Judul</h2>

      <div className="flex flex-col gap-4">
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul"
          className={gaya}
        />

        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className={gaya}>
          {daftarKategori.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <select value={format} onChange={(e) => setFormat(e.target.value)} className={gaya}>
          {daftarFormat.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {format === "Serial" ? (
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm text-neutral-400">
              Season
              <input type="number" min="1" value={season} onChange={(e) => setSeason(e.target.value)} className={gaya} />
            </label>
            <label className="flex flex-col gap-1 text-sm text-neutral-400">
              Episode
              <input type="number" min="0" value={episode} onChange={(e) => setEpisode(e.target.value)} className={gaya} />
            </label>
          </div>
        ) : (
          <label className="flex flex-col gap-1 text-sm text-neutral-400">
            Part / seri ke
            <input type="number" min="1" value={part} onChange={(e) => setPart(e.target.value)} className={gaya} />
          </label>
        )}

        <select value={statusDipakai} onChange={(e) => setStatus(e.target.value)} className={gaya}>
          {daftarStatus.map((s) => (
            <option key={s} value={s} disabled={belumNonton && s === "Selesai"}>
              {s}
            </option>
          ))}
        </select>

        {belumNonton && (
          <p className="border border-red-500 rounded px-3 py-2 text-sm text-red-400">
            Pilihan <b>"Selesai"</b> masih terkunci. Isi kolom <b>Episode</b> minimal <b>1</b> untuk membukanya.
          </p>
        )}

        <input
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Catatan (opsional)"
          className={gaya}
        />

        <button
          onClick={simpan}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold"
        >
          Simpan
        </button>

        {berhasil && <p className="text-green-400 text-center">Tontonan berhasil ditambahkan.</p>}
      </div>
    </main>
  );
}