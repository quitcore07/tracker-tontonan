// Dulu: Counter.jsx
// Sekarang: ProgresEpisode.jsx
// Fungsi: menghitung episode yang sudah ditonton

import { useState } from "react";

export default function ProgresEpisode() {
  const [episode, setEpisode] = useState(0);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Progres Episode</h2>
      <p className="mb-2 text-slate-400">Episode terakhir yang sudah kamu tonton</p>
      <p className="text-4xl mb-4">{episode}</p>
      <button
        onClick={() => setEpisode(episode + 1)}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
      >
        Episode Berikutnya
      </button>

      <button
        onClick={() => setEpisode(Math.max(0, episode - 1))}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold ml-4"
      >
        Kurangi
      </button>

      <button
        onClick={() => setEpisode(0)}
        className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold ml-4"
      >
        Reset
      </button>
    </div>
  );
}