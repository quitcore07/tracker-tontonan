export default function Header({ setHalaman }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
      <h1 className="text-2xl font-bold text-blue-400">Tracker Tontonan</h1>
      <nav className="flex gap-6">
        <button onClick={() => setHalaman("beranda")} className="hover:text-blue-400">Beranda</button>
        <button onClick={() => setHalaman("daftar")} className="hover:text-blue-400">Daftar Tontonan</button>
      </nav>
    </header>
  );
}