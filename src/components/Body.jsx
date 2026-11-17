import { useState } from "react";
import Card from "./Card";

export default function Body() {
  const [tontonan] = useState([
    { id: 1, judul: "Contoh Film", status: "Ingin ditonton" },
    { id: 2, judul: "Contoh Series", status: "Sedang ditonton" },
  ]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Daftar Tontonan</h2>
      <ul className="flex flex-col gap-3">
        {tontonan.map((item) => (
          <Card key={item.id} judul={item.judul} status={item.status} />
        ))}
      </ul>
    </main>
  );
}