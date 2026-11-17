export default function Card({ judul, status }) {
  return (
    <li className="border border-slate-700 rounded-lg p-4">
      <p className="font-semibold">{judul}</p>
      <p className="text-sm text-slate-400">{status}</p>
    </li>
  );
}