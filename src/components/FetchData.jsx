import { useState, useEffect } from "react";

export default function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((hasil) => {
        setData(hasil);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-400">{error}</p>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Data Pengguna</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}